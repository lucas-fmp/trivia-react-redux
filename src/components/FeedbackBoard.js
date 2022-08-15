import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class FeedbackBoard extends Component {
  render() {
    const { playerInfo: { score, assertions } } = this.props;
    return (
      <div>
        <p
          data-testid="feedback-total-score"
        >
          score:
          {' '}
          { score }
        </p>
        <p
          data-testid="feedback-total-question"
        >
          acertos:
          {' '}
          { assertions }
        </p>
      </div>
    );
  }
}

FeedbackBoard.propTypes = {
  playerInfo: PropTypes.shape({
    score: PropTypes.number.isRequired,
    assertions: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  playerInfo: state.player,
});

export default connect(mapStateToProps, null)(FeedbackBoard);
