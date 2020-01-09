import React, { Component } from "react";

import { NavLink } from "react-router-dom";

import Loader from "../../componens/UI/Loader/Loader";

import classes from "./QuizList.module.css";
import { connect } from "react-redux";
import { fetchQuizes } from "../../store/actions/quiz";
class QuizList extends Component {
  renderQuizes() {
    return this.props.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }
  componentDidMount() {
    console.log(this.props);
    this.props.fetchQuizes();
    // try {
    //   const response = await axios.get("/quizes.json");
    //   // console.log(response.data);
    //   const quizes = [];
    //   Object.keys(response.data).forEach((key, index) => {
    //     // console.log(arr);
    //     quizes.push({
    //       id: key,
    //       name: `Тест №${index + 1}`
    //     });
    //   });
    //   this.setState({
    //     quizes,
    //     isLoader: false
    //   });
    //   // console.log(this.state.quizes);
    // } catch (e) {}
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.props.loading && this.props.quizes.length !== 0 ? (
            <Loader />
          ) : (
            <ul>{this.renderQuizes()}</ul>
          )}
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    quizes: state.quiz.quizes,
    isLoading: state.quiz.isLoading
  };
}
function mapDispatchToProps(dispatch) {
  return {
    fetchQuizes: () => dispatch(fetchQuizes())
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(QuizList);
