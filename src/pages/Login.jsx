import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Login extends Component {
  state = {
    email: '',
    name: '',
    isDisable: true,
  };

  handleChange = ({ target: { name, value } }) => {
    this.setState({
      [name]: value,
    }, () => this.validationField());
  };

  validationField = () => {
    const { email, name } = this.state;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidName = name.length > 0;
    const isValidEmail = emailRegex.test(email);
    this.setState({
      isDisable: !isValidEmail || !isValidName,
    });
  };

  handleClick = (e) => {
    e.preventDefault();
  };

  clickBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  render() {
    const { isDisable, name, email } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="input-email">
            <input
              data-testid="input-gravatar-email"
              id="input-email"
              type="email"
              name="email"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="input-name">
            <input
              data-testid="input-player-name"
              id="input-name"
              type="text"
              name="name"
              value={ name }
              onChange={ this.handleChange }
            />
          </label>
          <button
            data-testid="btn-play"
            type="button"
            disabled={ isDisable }
            onClick={ this.handleClick }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ this.clickBtn }
          >
            Configurações

          </button>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired };

export default connect()(Login);
