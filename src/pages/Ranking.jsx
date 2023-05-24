import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Ranking extends Component {
  state = {
    player: '',
  };

  componentDidMount() {
    this.getStorage();
  }

  getStorage = () => {
    const objPlayer = JSON.parse(localStorage.getItem('ranking'));
    this.setState({
      player: objPlayer,
    });

  handleClick = () => {
    const { history } = this.props;
    history.push('/');
  };

  render() {
    const { player } = this.state;
    return (
      <>
        <div data-testid="ranking-title">
          Ranking
        </div>
        { player && (
          <div>
            { player.map(({ name, score, picture }) => (
              <>
                <img src={ picture } alt={ name } />
                <p data-testid={ `player-name-${index}` }>{ name }</p>
                <p data-testid={ `player-score-${index}` }>{ score }</p>
              </>
            )) }
          </div>
        ) }
      </>
      <div data-testid="ranking-title">
        Ranking
        <button
          onClick={ this.handleClick }
          data-testid="btn-go-home"
        >
          Go Home
        </button>
      </div>
    );
  }
}

Ranking.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

//

export default connect()(Ranking);
