import React, { Component } from "react";

export default class AnswerCard extends Component {
  selectAnswer = (answerText) => {
    this.props.selectAnswer(answerText);
  };

  render() {
    const { answerText, correctAnswer, currentAnswer } = this.props;
    const rightAnswer = currentAnswer && answerText === correctAnswer;

    const wrongAnswer =
      answerText === currentAnswer && currentAnswer !== correctAnswer;

    const correctClass = rightAnswer ? "correct-answer " : "";
    const wrongClass = wrongAnswer ? "incorrect-answer" : "";

    const disableClass = currentAnswer && "disable-answer";

    return (
      <div
        className={`quiz-answer ${correctClass} ${wrongClass} ${disableClass}`}
        onClick={() => this.selectAnswer(answerText)}
      >
        {answerText}
      </div>
    );
  }
}
