import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import Header from '../components/Header';
import './styles/Game.css';
import { getAssertions, getScore } from '../redux/actions/action-index';
import NextBtn from '../components/NextBtn';

class Game extends Component {
  state = {
    allQuestions: [],
    correct: '',
    incorrect: '',
    questionsCorrect: 0,
    currQuestion: {},
    currQuestionIndex: 0,
    shuflleAnswers: [],
    timerRemaining: 30,
    timerInterval: null,
    btnNext: false,
  };

  async componentDidMount() {
    await this.testToken();
    this.startTimer();
  }

  // componentDidUpdate() {
  //   this.startTimer();
  // }

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
        allQuestions: results,
        // timerRemaning: 0,
        currQuestion: results[0],
        shuflleAnswers,
        correctAnswer,
      });
    }
  };

  answerClick = (e) => {
    e.preventDefault();
    const { timerRemaining } = this.state;
    this.setState({
      incorrect: 'game__incorrect',
      correct: 'game__correct',
      btnNext: true,
      buttonsDisabled: timerRemaining <= 0 || true,
    });
  };

  sumScore = (e) => {
    const { score, dispatch } = this.props;
    const { timerRemaining, currQuestion, questionsCorrect } = this.state;
    const { difficulty } = currQuestion;
    const scoreDifficulty = {
      hard: 3,
      medium: 2,
      easy: 1,
    };
    const sumTen = 10;
    const testess = questionsCorrect + 1;
    this.setState({
      questionsCorrect: testess,
    }, () => this.answerClick(e));
    dispatch(getScore(score + sumTen + (timerRemaining * scoreDifficulty[difficulty])));
    dispatch(getAssertions(testess));
    // this.teste();
  };

  nextClick = (e) => {
    e.preventDefault();
    const { history, name, score, gravatarAvatar } = this.props;
    const { currQuestionIndex, allQuestions } = this.state;
    const maxQuestion = 4;
    if (currQuestionIndex === maxQuestion) {
      const ranking = [{
        name,
        score,
        picture: gravatarAvatar,
      }];
      localStorage.setItem('ranking', JSON.stringify(ranking));
      history.push('/feedback');
    }
    const nextIndex = currQuestionIndex + 1;
    this.setState({
      currQuestionIndex: nextIndex,
      currQuestion: allQuestions[nextIndex],
      buttonsDisabled: false,
    }, () => {
      this.showAnswers();
      clearInterval(this.timerInterval);
    });
  };

  showAnswers = () => {
    const { currQuestion } = this.state;
    const {
      incorrect_answers: incorrectAnswer,
      correct_answer: correctAnswer,
    } = currQuestion;
    const answers = [...incorrectAnswer, correctAnswer];
    const shuflleAnswers = _.shuffle(answers);
    this.setState({
      shuflleAnswers,
      timerRemaining: 30,
      correctAnswer,
      correct: '',
      incorrect: '',
    });
  };

  render() {
    const {
      currQuestion,
      shuflleAnswers,
      correctAnswer,
      incorrect,
      correct,
      timerRemaining,
      btnNext,
      buttonsDisabled,
    } = this.state;
    const {
      category,
      question,
    } = currQuestion;

    const timing = timerRemaining <= 0;

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
              disabled={ buttonsDisabled || timing }
            >
              {answer}
            </button>
          ) : (
            <button
              data-testid={ `wrong-answer-${index}` }
              key={ Math.random() }
              className={ `${incorrect} ${buttonsDisabled ? 'disabled' : ''}` }
              onClick={ this.answerClick }
              disabled={ buttonsDisabled || timing }
            >
              {answer}
            </button>
          )))}
        </div>
        {btnNext && (
          <NextBtn handleClick={ this.nextClick } />
        )}
        <div>
          Tempo Restante:
          {timerRemaining}
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
  assertions: globalState.player.assertions,
  name: globalState.player.name,
  gravatarAvatar: globalState.player.gravatarAvatar,
});

export default connect(mapStateToProps)(Game);
