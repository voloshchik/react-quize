import React from "react";
import classes from "./AnswerList.module.css";

import AnswerItem from "./AnswerItem/AnswerItem";

const AnswerList = props => {
  return (
    <ul className={classes.AnswerList}>
      {props.answers.map((answer, index) => {
        return <AnswerItem key={index} answer={answer} />;
      })}
    </ul>
  );
};

export default AnswerList;
