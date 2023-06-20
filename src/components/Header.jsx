import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import { getAvatar } from '../redux/actions/action-index';
import './Header.css';

class Header extends Component {
  state = {
    avatar: '',
  };

  componentDidMount() {
    const { email, dispatch } = this.props;
    const hash = md5(email).toString();
    const linkAvatar = `https://www.gravatar.com/avatar/${hash}`;
    this.setState({
      avatar: linkAvatar,
    });
    dispatch(getAvatar(linkAvatar));
  }

  render() {
    const { avatar } = this.state;
    const { name, score } = this.props;
    return (
      <div className="header__container">
        {avatar && (
          <img
            data-testid="header-profile-picture"
            alt="Avatar de usuario"
            src={ avatar }
            className="header__img"
          />
        )}

        <p
          data-testid="header-player-name"
        >
          {`Welcome, ${name}`}
        </p>
        <p
          data-testid="header-score"
        >
          {`Your score: ${score} pts`}

        </p>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
  name: PropTypes.string,
  score: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  name: globalState.player.name,
  email: globalState.player.gravatarEmail,
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Header);
