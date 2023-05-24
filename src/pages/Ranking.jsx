import React, { Component } from 'react';
import { connect } from 'react-redux';

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
  // console.log(objPlayer.map(({ name }) => name));
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

    );
  }
}

export default connect()(Ranking);
