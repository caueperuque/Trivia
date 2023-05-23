import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './styles/Game.css';
import { getScore } from '../redux/actions/action-index';

class Game extends Component {
  state = {
    correct: '',
    incorrect: '',
    currQuestion: {},
    shuflleAnswers: [],
    timerRemaining: 30,
    timerInterval: null,
  };

  async componentDidMount() {
    await this.testToken();
    this.startTimer();
  }

  startTimer = () => {
    const seconds = 1000;
    const timerInterval = setInterval(() => {
      this.setState((prevState) => {
        const newTimeRemaining = prevState.timerRemaining - 1;
        if (newTimeRemaining <= 0) {
          clearInterval(prevState.timerInterval);
        }
        return {
          timerRemaining: newTimeRemaining,
        };
      });
    }, seconds);

    this.setState({
      timerInterval,
    });
  };

  testToken = async () => {
    const getToken = localStorage.getItem('token');
    const URL_API = `https://opentdb.com/api.php?amount=5&token=${getToken}`;
    const response = await fetch(URL_API);
    const JSON_DATA = await response.json();
    const { response_code: responseCode, results } = JSON_DATA;
    const { history } = this.props;
    const failedResponse = 3;
    if (responseCode === failedResponse) {
      localStorage.removeItem('token');
      history.push('/');
    } else {
      const {
        incorrect_answers: incorrectAnswer,
        correct_answer: correctAnswer,
      } = results[0];
      const answers = [...incorrectAnswer, correctAnswer];
      const shuflleAnswers = _.shuffle(answers);
      clearInterval(this.timerInterval);
      this.setState({
        // allQuestions: results,
        // timerRemaning: 0,
        currQuestion: results[0],
        shuflleAnswers,
        correctAnswer,
      });
    }
  };

  answerClick = (e) => {
    e.preventDefault();
    this.setState({
      incorrect: 'game__incorrect',
      correct: 'game__correct',
    });
  };

  sumScore = (e) => {
    const { score, dispatch } = this.props;
    const { timerRemaining, currQuestion } = this.state;
    const { difficulty } = currQuestion;
    const scoreDifficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const sumTen = 10;
    this.answerClick(e);
    dispatch(getScore(score + sumTen + (timerRemaining * scoreDifficulty[difficulty])));
  };

  render() {
    const {
      currQuestion,
      shuflleAnswers,
      correctAnswer,
      incorrect,
      correct,
      timerRemaining,
    } = this.state;
    const {
      category,
      question,
    } = currQuestion;

    const buttonsDisabled = timerRemaining <= 0;

    return (
      <>
        <Header />
        <p data-testid="question-category">{category}</p>
        <div data-testid="question-text">{question}</div>
        <div data-testid="answer-options">
          {shuflleAnswers.map((answer, index) => (correctAnswer === answer ? (
            <button
              data-testid="correct-answer"
              key={ Math.random() }
              className={ `${correct} ${buttonsDisabled ? 'disabled' : ''}` }
              onClick={ this.sumScore }
              disabled={ buttonsDisabled }
            >
              {answer}
            </button>
          ) : (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ Math.random() }
              className={ `${incorrect} ${buttonsDisabled ? 'disabled' : ''}` }
              onClick={ this.answerClick }
              disabled={ buttonsDisabled }
            >
              {answer}
            </button>
          )))}
        </div>
        <div>
          Tempo Restante:
          {' '}
          {timerRemaining}
          {' '}
          Segundos
        </div>
      </>
    );
  }
}

Game.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;

const mapStateToProps = (globalState) => ({
  score: globalState.player.score,
});

export default connect(mapStateToProps)(Game);
