import React, { Component } from "react";
import classes from "./Quiz.module.css";
import ActiveQuiz from "../../componens/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../componens/ActiveQuiz/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quiz: [
      {
        question: "Какого цвета небо",
        rightAnswerId: 2,
        id: 1,
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
        id: 2,
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
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0];
      if (this.state.answerState[key] === "success") {
        return;
      }
    }
    console.log("Answer Id", answerId);
    const question = this.state.quiz[this.state.activeQuestion];
    const results = this.state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      this.setState({
        answerState: { [answerId]: "success" },
        results
      });
      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          console.log("Finished");
          this.setState({
            isFinished: true
          });
        } else {
          this.setState({
            activeQuestion: this.state.activeQuestion + 1
          });
          this.setState({
            answerState: null
          });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      this.setState({
        answerState: { [answerId]: "error" },
        results
      });
    }
  };
  isQuizFinished() {
    return this.state.activeQuestion + 1 === this.state.quiz.length;
  }
  retryHandler = () => {
    this.setState({
      activeQuestion: 0,
      answerState: null,
      isFinished: false,
      results: {}
    });
  };
  componentDidMount(){
    console.log("Quiz ID= ",this.props.match.params.id )
  }
  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.isFinished ? (
            <FinishedQuiz
              onRetry={this.retryHandler}
              results={this.state.results}
              quiz={this.state.quiz}
            />
          ) : (
            <ActiveQuiz
              question={this.state.quiz[this.state.activeQuestion].question}
              answers={this.state.quiz[this.state.activeQuestion].answers}
              onAnswerClick={this.onAnswerClickHandlerId}
              answerNumber={this.state.activeQuestion + 1}
              quizLength={this.state.quiz.length}
              state={this.state.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
export default Quiz;
