import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    QUIZ_FINISHED,
    QUIZ_NEXT_QUSTION,
    QUIZ_RETRY
} from '../actions/actionTypes';
const initialState = {
  isLoading: false,
  quizes: [],
  error: null,
  results: {},
  isFinished: false,
  activeQuestion: 0,
  answerState: null,
  quiz: null
};
export default function quizReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_QUIZES_START:
      return {
        ...state,
        isLoading: true
      };
    case FETCH_QUIZES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quizes: action.quizes
      };
    case FETCH_QUIZES_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    case FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        isLoading: false,
        quiz: action.quiz
      };
    case QUIZ_SET_STATE:
      return {
        ...state,
        answerState: action.answerState,
        results: action.results
      };
    case QUIZ_FINISHED:
      return {
        ...state,
        isFinished: true
      };
    case QUIZ_NEXT_QUSTION:
      return {
        ...state,
        activeQuestion: action.number,
        answerState: null
      };
    case QUIZ_RETRY:
      return {
        ...state,
        results: {},
        isFinished: false,
        activeQuestion: 0,
        answerState: null,
        
        
      };
    default:
      return state;
  }
}
