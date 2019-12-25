import React, { Component } from "react";
import classes from "./Drower.module.css";
import Backdrop from "../../UI/Button/Backdrop/Backdrop";
const Links = [1, 2, 3];
export default class Drower extends Component {
  renderLinks() {
    return Links.map((Link, index) => {
      return (
        <li key={index}>
          <a href="">Link{Link}</a>
        </li>
      );
    });
  }
  render() {
      const cls=[classes.Drower]
      if(!this.props.isOpen){
          cls.push(classes.close)
      }
    return (
      <React.Fragment>
      <nav className={cls.join(' ')}>
        <ul>{this.renderLinks()}</ul>
      </nav>
        {this.props.isOpen ? <Backdrop onClick={this.props.onClose}/>: null}
      </React.Fragment>
    );
  }
}
