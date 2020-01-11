import React, { Component } from "react";

import { connect } from "react-redux";

import ActiveQuiz from "../../componens/ActiveQuiz/ActiveQuiz";
import { fetchQuizById, quizAncwerClick, retryQuiz } from '../../store/actions/quiz';
import FinishedQuiz from "../../componens/ActiveQuiz/FinishedQuiz/FinishedQuiz";
import Loader from "../../componens/UI/Loader/Loader";

import classes from "./Quiz.module.css";
class Quiz extends Component {
  state = {
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    loading: true,
    quiz: null
  };

  
  
  // retryHandler = () => {
  //   this.setState({
  //     activeQuestion: 0,
  //     answerState: null,
  //     isFinished: false,
  //     results: {}
  //   });
  // };
  componentWillMount(){
    this.props.retryQuiz()
  }
  componentDidMount() {
    this.props.fetchQuizById(this.props.match.params.id);
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.props.loading || !this.props.quiz ? (
            <Loader />
          ) : this.props.isFinished ? (
            <FinishedQuiz
              results={this.props.results}
              quiz={this.props.quiz}
              onRetry={this.props.retryQuiz}
            />
          ) : (
            <ActiveQuiz
              answers={this.props.quiz[this.props.activeQuestion].answers}
              question={this.props.quiz[this.props.activeQuestion].question}
              onAnswerClick={this.props.quizAncwerClick}
              quizLength={this.props.quiz.length}
              answerNumber={this.props.activeQuestion + 1}
              state={this.props.answerState}
            />
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    results: state.quiz.results,
    isFinished: state.quiz.isFinished,
    activeQuestion: state.quiz.activeQuestion,
    answerState: state.quiz.answerState,
    quiz: state.quiz.quiz,
    loading: state.quiz.loading
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuizById: id => dispatch(fetchQuizById(id)),
    quizAncwerClick: answerId => dispatch(quizAncwerClick(answerId)),
    retryQuiz:()=>dispatch(retryQuiz())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
