import React, { Component } from "react";
import classes from "./QuizCreator.module.css";
import Button from "../../componens/UI/Button/Button";
import { createControl } from "../../form/formFramework";
import Input from "../../componens/UI/Button/input/input";
import Axulliary from "../../hoc/layout/Axulliary/Axulliary";
import Select from "../../componens/UI/Button/Select/Select";
function createOptionControl(number) {
  return createControl(
    {
      label: `Вариант ${number}`,
      errorMessage: "Поле не может быть пустым",
      id: number
    },

    { requered: true }
  );
}
function createFornControls() {
  return {
    question: createControl(
      {
        label: "Введите вопрос",
        errorMessage: "Вопрос не может быть пустым"
      },
      { requered: true }
    ),
    option1: createOptionControl(1),
    option2: createOptionControl(2),
    option3: createOptionControl(3),
    option4: createOptionControl(4)
  };
}
export default class QuizCreator extends Component {
  state = {
    quiz: [],
    rightAnswerId: 1,
    formControls: createFornControls()
  };
  submitHandler = event => {
    event.preventDefault();
  };
  addQuestionHandler = () => {};
  createQuizHandler = () => {};
  changeHandler = (value, controlName) => {};
  renderControls() {
    return Object.keys(this.state.formControls).map((controlName, index) => {
      const control = this.state.formControls[controlName];
      return (
        <Axulliary key={controlName + index}>
          <Input
            label={control.label}
            value={control.value}
            valid={control.valid}
            shouldValidate={!!control.validation}
            errorMessage={control.errorMessage}
            onChange={event =>
              this.changeHandler(event.target.value, controlName)
            }
          />
          {index === 0 ? <hr key={controlName + index + 10} /> : null}
        </Axulliary>
      );
    });
  }
  selectChangeHandler = event => {
    console.log(event.target.value);
    this.setState({
      rightAnswerId: event.target.value
    });
  };
  render() {
    const select = (
      <Select
        label="Выбирете правильный ответ"
        value={this.state.rightAnswerId}
        onChange={this.selectChangeHandler}
        options={[
          { text: 1, value: 1 },
          { text: 2, value: 2 },
          { text: 3, value: 3 },
          { text: 4, value: 4 }
        ]}
      />
    );
    return (
      <div className={classes.QuizCreator}>
        <div>
          <h1>Создание теста</h1>
          <form action="" onSubmit={this.submitHandler}>
            {this.renderControls()}
            {select}
            
            <Button type="primary" onClick={this.addQuestionHandler}>
              Добавить вопрос
            </Button>
            <Button type="success" onClick={this.createQuizHandler}>
              Создать тест
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
