import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    player: [],
  };

  componentDidMount() {
    this.getStorage();
  }

  getStorage = () => {
    const objPlayer = JSON.parse(localStorage.getItem('ranking'));
    this.setState((prevState) => ({
      player: [...prevState.player, objPlayer],
    }));
  };

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { player } = this.state;
    return (
      <div>
        <div data-testid="ranking-title">
          Ranking
        </div>
        {player.length > 0 && (
          <div>
            {player.map(({ name, score, picture }, index) => (
              <div key={ index }>
                <img src={ picture } alt={ name } />
                <p data-testid={ `player-name-${index}` }>{name}</p>
                <p data-testid={ `player-score-${index}` }>{score}</p>
              </div>
            ))}
          </div>
        )}
        <div>
          <button
            onClick={ this.handleClick }
            data-testid="btn-go-home"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

export default connect()(Ranking);

//
