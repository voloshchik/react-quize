import React, { Component } from "react";
import classes from "./QuizList.module.css";
import { NavLink } from "react-router-dom";
import axios from "../../axios/axios-quiz";
import Loader from "../../componens/UI/Loader/Loader";
export default class QuizList extends Component {
  state = {
    isLoader: true,
    quizes: []
  };
  renderQuizes() {
    return this.state.quizes.map(quiz => {
      return (
        <li key={quiz.id}>
          <NavLink to={"/quiz/" + quiz.id}>{quiz.name}</NavLink>
        </li>
      );
    });
  }
  async componentDidMount() {
    try {
      const response = await axios.get(
        "/quizes.json"
      );
      console.log(response.data);
      const quizes = [];
      Object.keys(response.data).forEach((key, index) => {
        // console.log(arr);
        quizes.push({
          id: key,
          name: `Тест №${index + 1}`
        });
      });

      this.setState({
        quizes,
        isLoader:false
      });
      // console.log(this.state.quizes);
    } catch (e) {}
  }
  render() {
    return (
      <div className={classes.QuizList}>
        <div>
          <h1>Список тестов</h1>
          {this.state.isLoader ? <Loader /> : <ul>{this.renderQuizes()}</ul>}
        </div>
      </div>
    );
  }
}
