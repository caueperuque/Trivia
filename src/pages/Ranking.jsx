import React, { Component } from 'react';
import { connect } from 'react-redux';

class Ranking extends Component {
  handleClick = () => {
    const {history} = this.props
    history.push('/')
  }

  render() {
    return (
    <div data-testid="ranking-title">
      Ranking
      <button 
      onClick={this.handleClick}
      data-testid="btn-go-home">
      Go Home
      </button>
    </div>
      );
  }
}

export default connect()(Ranking);
