import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../componens/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    activeQuestion: 0,
    quiz: [
      {
        question: "Какого цвета небо",
        rightAnswerId: 2,
        id:1,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Красный", id: 3 },
          { text: "Фиолетовый", id: 4 }
        ]
      },
      {
        question: "В каком году основали Санкт-Петербург",
        rightAnswerId: 3,
        id:2,
        answers: [
          { text: "1700", id: 1 },
          { text: "1702", id: 2 },
          { text: "1703", id: 3 },
          { text: "1803", id: 4 }
        ]
      }
    ]
  };
  onAnswerClickHandlerId = answerId => {
    console.log("Answer Id", answerId);
    this.setState(
      {
        activeQuestion:this.state.activeQuestion+1
      }
    )
  };
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
            question={this.state.quiz[this.state.activeQuestion].question}
            answers={this.state.quiz[this.state.activeQuestion].answers}
            onAnswerClick={this.onAnswerClickHandlerId}
            answerNumber={this.state.activeQuestion + 1}
            quizLength={this.state.quiz.length}
          />
        </div>
      </div>
    );
  }
}
export default Quiz;
