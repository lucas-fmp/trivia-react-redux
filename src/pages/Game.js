import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Header from '../components/Header';
import QuestionBoard from '../components/QuestionBoard';
import fetchQuestions from '../services/fetchApi';
import ButtonNext from '../components/ButtonNext';
import triviaImg from '../trivia.png';

class Game extends Component {
  constructor() {
    super();
    this.state = {
      questions: undefined,
      questionIdx: 0,
      nextEnable: false,
      borderEnable: false,
      alreadyIncremented: false,
    };
  }

  componentDidMount() {
    this.getQuestions();
  }

  getToken = () => localStorage.getItem('token');

  getQuestions = async () => {
    const token = this.getToken();
    const questions = await fetchQuestions(token);
    this.verifyInvalidToken(questions);
    this.setState({ questions });
  }

  verifyInvalidToken = ({ response_code: responseCode }) => {
    const { history } = this.props;
    const errorCode = 3;
    if (responseCode === errorCode) {
      localStorage.removeItem('token');
      history.push('/');
    }
  }

  selectAnswer = () => this.setState(
    { nextEnable: true, alreadyIncremented: true },
  )

  getNextQuestion = () => {
    const { questionIdx } = this.state;
    const { history } = this.props;
    const questionsLength = 4;
    if (questionIdx === questionsLength) {
      history.push('/feedback');
    }
    this.setState((prev) => ({
      questionIdx: prev.questionIdx + 1,
      borderEnable: !prev.borderEnable,
      alreadyIncremented: false,
      nextEnable: false,
    }
    ));
  }

  activeBorder = () => {
    this.setState({
      borderEnable: true,
    });
  }

  render() {
    const { questions, questionIdx, nextEnable,
      borderEnable, alreadyIncremented } = this.state;
    return (
      <div>
        <Header />
        <main className="game-board">
          <div className="trivia-img">
            <img src={ triviaImg } alt="trivia" />
          </div>
          <div className="question-board">
            {
              questions && <QuestionBoard
                questionInfo={ questions.results[questionIdx] }
                selectAnswer={ this.selectAnswer }
                border={ { borderEnable, activeBorder: this.activeBorder } }
                alreadyIncremented={ alreadyIncremented }
              />
            }
            {
              nextEnable && <ButtonNext
                getNextQuestion={ this.getNextQuestion }
              />
            }
          </div>
        </main>
      </div>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Game;
