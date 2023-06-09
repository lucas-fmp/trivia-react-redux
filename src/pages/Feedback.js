import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import FeedbackBoard from '../components/FeedbackBoard';
import FeedbackText from '../components/FeedbackText';

class Feedback extends Component {
  constructor(props) {
    super(props);

    this.state = ({
      url: '',
      name: '',
      score: 0,
    });
  }

  componentDidMount = async () => {
    const { logindata } = this.props;
    const { gravatarEmail } = logindata;
    const convertedEmail = md5(gravatarEmail).toString();
    const gravatarLink = `https://www.gravatar.com/avatar/${convertedEmail}`;
    this.setState({
      url: gravatarLink,
      name: logindata.name,
      score: logindata.score,
    });
  }

  redirectToRanking = () => {
    const { history } = this.props;
    history.push('/ranking');
  }

  redirectToHome = () => {
    const { history } = this.props;
    history.push('/');
  }

  render() {
    const { url, name, score } = this.state;
    return (
      <div className="feedback-section">
        <header className="header-section">
          <div className="profile-section">
            <img alt="profile" src={ url } data-testid="header-profile-picture" />
            <p data-testid="header-player-name">{name}</p>
          </div>
          <div className="score-section">
            <p data-testid="header-score">
              score:
              {' '}
              {score}
            </p>
          </div>
        </header>
        <FeedbackText />
        <FeedbackBoard />
        <div className="buttons-section">
          <button
            type="button"
            data-testid="btn-play-again"
            onClick={ this.redirectToHome }
          >
            Jogar Novamente
          </button>
          <button
            data-testid="btn-ranking"
            type="button"
            onClick={ this.redirectToRanking }
          >
            Ranking
          </button>
        </div>
      </div>
    );
  }
}

Feedback.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
  logindata: PropTypes.shape({
    gravatarEmail: PropTypes.string,
    name: PropTypes.string,
    score: PropTypes.number,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  logindata: state.player,
});

export default connect(mapStateToProps, null)(Feedback);
