import React, { Component } from "react";
import AnswerCard from "./AnswerCard";

export default class QuestionCard extends Component {
  navigateNext = () => {
    this.props.navigateNext();
  };

  render() {
    const {
      quizzes,
      quiz,
      currentAnswers,
      currentQuestionIndex,
      selectAnswer,
      currentAnswer,
      correctAnswer,
    } = this.props;

    return (
      <div>
        <p>
          Question : {currentQuestionIndex + 1} / {quizzes?.length}
        </p>
        <h2>{quiz?.question}</h2>
        {currentAnswers.map((q, i) => (
          <AnswerCard
            kays={i}
            answerText={q}
            selectAnswer={selectAnswer}
            correctAnswer={correctAnswer}
            currentAnswer={currentAnswer}
          />
        ))}
        <button className="next-question" onClick={this.navigateNext}>
          Next Question
        </button>
      </div>
    );
  }
}
