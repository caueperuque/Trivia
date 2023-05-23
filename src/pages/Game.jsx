import { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Header from '../components/Header';

class Game extends Component {
  state = {
    // allQuestions: [],
    currQuestion: {},
    shuflleAnswers: [],
  };

  componentDidMount() {
    this.testToken();
  }

  testToken = async () => {
    const getToken = localStorage.getItem('token');
    const URL_API = `https://opentdb.com/api.php?amount=5&token=${getToken}`;
    const response = await fetch(URL_API);
    const JSON_DATA = await response.json();
    // console.log(JSON_DATA);
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
      this.setState({
        // allQuestions: results,
        currQuestion: results[0],
        shuflleAnswers,
        correctAnswer,
      });
    }
  };

  render() {
    const { currQuestion, shuflleAnswers, correctAnswer } = this.state;
    const {
      category,
      // type,
      question,
    } = currQuestion;
    // console.log(shuflleAnswers);
    return (
      <>
        <Header />
        <p
          data-testid="question-category"
        >
          { category }

        </p>
        <div data-testid="question-text">{question}</div>
        <div data-testid="answer-options">
          {shuflleAnswers.map((answer, index) => (
            correctAnswer === answer ? (
              <button data-testid="correct-answer" key={ Math.random() }>
                {answer}
              </button>
            ) : (
              <button data-testid={ `wrong-answer-${index}` } key={ Math.random() }>
                {answer}
              </button>
            )
          ))}
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

export default Game;
