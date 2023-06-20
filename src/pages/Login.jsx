import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getLogin } from '../redux/actions/action-index';
import './styles/Login.css';

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

  clickBtn = () => {
    const { history } = this.props;
    history.push('/settings');
  };

  handleClick = async (e) => {
    e.preventDefault();
    const { history, dispatch } = this.props;
    await this.getAPI();
    dispatch(getLogin(this.state));
    history.push('/game');
  };

  getAPI = async () => {
    const URL_API = 'https://opentdb.com/api_token.php?command=request';
    const response = await fetch(URL_API);
    const JSON_DATA = await response.json();
    const { token } = JSON_DATA;
    localStorage.setItem('token', token);
  };

  render() {
    const { isDisable, name, email } = this.state;
    return (
      <div className="login__container-main">
        <form className="login__form">
          <div className="login__div-input">
            <label htmlFor="input-email">
              Email:
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
              Nome:
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
              className="login__btn-play"
              data-testid="btn-play"
              type="button"
              disabled={ isDisable }
              onClick={ this.handleClick }
            >
              Play
            </button>

            <button
              className="login__btn-config"
              type="button"
              data-testid="btn-settings"
              onClick={ this.clickBtn }
            >
              Configurações

            </button>
          </div>
        </form>
      </div>
    );
  }
}
Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Login);
