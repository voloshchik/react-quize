import axios from "../../axios/axios-quiz";

import {
  FETCH_QUIZ_SUCCESS,
  FETCH_QUIZES_ERROR,
  FETCH_QUIZES_START,
  FETCH_QUIZES_SUCCESS,
  QUIZ_SET_STATE,
  QUIZ_FINISHED,
  QUIZ_NEXT_QUSTION,
  QUIZ_RETRY
} from "./actionTypes";

export function fetchQuizes() {
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try {
      const response = await axios.get("/quizes.json");

      const quizes = [];

      Object.keys(response.data).forEach((key, index) => {
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        });
      });

      dispatch(fetchQuizesSuccess(quizes));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export function fetchQuizById(quizId) {
  return async dispatch => {
    dispatch(fetchQuizesStart());

    try {
      const response = await axios.get(`/quizes/${quizId}.json`);
      const quiz = response.data;

      dispatch(fetchQuizSuccess(quiz));
    } catch (e) {
      dispatch(fetchQuizesError(e));
    }
  };
}

export default function quizSetState(answerState, results) {
  return {
    type: QUIZ_SET_STATE,
    answerState,
    results
  };
}
export function fetchQuizSuccess(quiz) {
  return {
    type: FETCH_QUIZ_SUCCESS,
    quiz
  };
}

export function fetchQuizesStart() {
  return {
    type: FETCH_QUIZES_START
  };
}

export function fetchQuizesSuccess(quizes) {
  return {
    type: FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizesError(e) {
  return {
    type: FETCH_QUIZES_ERROR,
    error: e
  };
}
export function quizFinished() {
  return {
    type: QUIZ_FINISHED
  };
}
export function quizNextQuestion(number) {
  return {
    type: QUIZ_NEXT_QUSTION,
    number
  };
}
function isQuizFinished(state) {
  return state.activeQuestion + 1 === state.quiz.length;
}
export function retryQuiz() {
  return {
    type: QUIZ_RETRY
  };
}
export function quizAncwerClick(answerId) {
  return (dispatch, getState) => {
    const state = getState().quiz;
    if (state.answerState) {
      const key = Object.keys(state.answerState)[0];
      if (state.answerState[key] === "success") {
        return;
      }
    }
    console.log("Answer Id", answerId);
    const question = state.quiz[state.activeQuestion];
    const results = state.results;
    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = "success";
      }
      dispatch(quizSetState({ [answerId]: "success" }, results));
      // this.setState({
      //   answerState: { [answerId]: "success" },
      //   results
      // });
      const timeout = window.setTimeout(() => {
        if (isQuizFinished(state)) {
          // console.log("Finished");
          dispatch(quizFinished());
          // this.setState({
          //   isFinished: true
          // });
        } else {
          dispatch(quizNextQuestion(state.activeQuestion + 1));
          // this.setState({
          //   activeQuestion: this.state.activeQuestion + 1
          // });
          // this.setState({
          //   answerState: null
          // });
        }
        window.clearTimeout(timeout);
      }, 1000);
    } else {
      results[question.id] = "error";
      dispatch(quizSetState({ [answerId]: "error" }, results));
      // this.setState({
      //   answerState: { [answerId]: "error" },
      //   results
      // });
    }
  };
}
