import React, { Component } from "react";
import QuestionCard from "./QuestionCard";
import Shuffle from "./utis";
import "./style.css";

const initialState = {
  quizzes: [],
  currentQuestionIndex: 0,
  currentAnswers: [],
  currentAnswer: "",
  startQuiz: false,
  endGame: false,
  correctAnswer: "",
  totalScore: 0,
};

export default class App extends Component {
  state = initialState;

  selectAnswer = (answerText) => {
    const isCorrect = answerText === this.state.correctAnswer;
    const { totalScore } = this.state;
    this.setState({
      currentAnswer: answerText,
      totalScore: isCorrect ? totalScore + 1 : totalScore,
    });
  };

  fetchQuiz = async () => {
    const res = await fetch(
      "https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple"
    );

    const { results } = await res.json();

    this.setState({
      quizzes: results,
      currentAnswers: Shuffle(results[0]),
      correctAnswer: results[0].correct_answer,
      startQuiz: true,
      endGame: false,
    });
  };

  navigateNext = () => {
    const isLastQuestion =
      this.state.currentQuestionIndex === this.state.quizzes.length - 1;

    if (!isLastQuestion) {
      this.setState((prevState) => ({
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        currentAnswers: Shuffle(
          prevState.quizzes[prevState.currentQuestionIndex + 1]
        ),
        correctAnswer:
          prevState.quizzes[prevState.currentQuestionIndex + 1].correct_answer,
        currentAnswer: "",
      }));
    } else {
      this.setState({
        endGame: true,
      });
    }
  };
  resetQuiz = () => {
    this.setState({ ...initialState });
  };
  render() {
    const {
      quizzes,
      currentQuestionIndex,
      currentAnswer,
      endGame,
      startQuiz,
      totalScore,
      correctAnswer,
      currentAnswers,
    } = this.state;

    return (
      <div>
        {endGame && (
          <div className="result">
            <h3>Result Page</h3>
            <p>Score {totalScore}</p>
            <button className="start-quiz" onClick={this.resetQuiz}>
              Start Quiz Again
            </button>
          </div>
        )}

        {!startQuiz && (
          <button className="start-quiz" onClick={this.fetchQuiz}>
            Start Quiz
          </button>
        )}
        {startQuiz && !endGame && (
          <QuestionCard
            correctAnswer={correctAnswer}
            quiz={quizzes[currentQuestionIndex]}
            navigateNext={this.navigateNext}
            currentQuestionIndex={currentQuestionIndex}
            quizzes={quizzes}
            selectAnswer={this.selectAnswer}
            currentAnswer={currentAnswer}
            currentAnswers={currentAnswers}
          />
        )}
      </div>
    );
  }
}
