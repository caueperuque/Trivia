import { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    return (
      <div>
        <Header />
        <p data-testid="feedback-text">FEEDBACK</p>
      </div>
    );
  }
}

export default connect()(Feedback);
