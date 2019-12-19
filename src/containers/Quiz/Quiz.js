import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../componens/ActiveQuiz/ActiveQuiz";

class Quiz extends Component {
  state = {
    quiz: [
      {
        question: "Какого цвета небо",
        rightAnswerId:2,
        answers: [
          { text: "Черный", id: 1 },
          { text: "Синий", id: 2 },
          { text: "Красный", id: 3 },
          { text: "Фиолетовый", id: 4 }
        ]
      }
    ]
  };
  onAnswerClickHandlerId=(answerId)=>{
    console.log('Answer Id', answerId)
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          <ActiveQuiz
          question={this.state.quiz[0].question}
          answers={this.state.quiz[0].answers}
          onAnswerClick={this.onAnswerClickHandlerId} 
          />
        </div>
      </div>
    );
  }
}
export default Quiz;
