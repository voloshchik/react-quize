import React, { Component } from "react";
import classes from "./Auth.module.css";

import Button from '../../componens/UI/Button/Button';
import Input from "../../componens/UI/Button/input/input";

export default class Auth extends Component {
  loginHandler = () => {};

  registerHandler = () => {};

  submitHandler = event => {
    event.preventDefault();
  };

  render() {
    return (
      <div className={classes.Auth}>
        <div>
          <h1>Авторизация</h1>

          <form onSubmit={this.submitHandler} className={classes.AuthForm}>
            <Input label='Email' errorMessage={'TEST'}/>
            <Input label='Пароль'/>
            {/* <input type="text" />
            <input type="text" /> */}

            <Button type="success" onClick={this.loginHandler}>
              Войти
            </Button>

            <Button type="primary" onClick={this.registerHandler}>
              Зарегиcрироваться
            </Button>
          </form>
        </div>
      </div>
    );
  }
}
