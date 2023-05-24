import { Component } from 'react';
import PropTypes from 'prop-types';

class NextBtn extends Component {
  render() {
    const { handleClick } = this.props;
    return (
      <button
        data-testid="btn-next"
        onClick={ handleClick }
      >
        Next
      </button>
    );
  }
}

NextBtn.propTypes = {
  handleClick: PropTypes.func,
}.isRequired;

export default NextBtn;
