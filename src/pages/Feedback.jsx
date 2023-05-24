import { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';

class Feedback extends Component {
  render() {
    const { assertions } = this.props;
    const three = 3;
    return (
      <div>
        <Header />
        {
          assertions < three ? (
            <p data-testid="feedback-text">Could be better...</p>
          ) : (
            <p data-testid="feedback-text">Well Done!</p>)
        }
      </div>
    );
  }
}

Feedback.propTypes = {
  assertions: PropTypes.number,
}.isRequired;

const mapStateToProps = (globalState) => ({
  assertions: globalState.player.assertions,
});

export default connect(mapStateToProps)(Feedback);
