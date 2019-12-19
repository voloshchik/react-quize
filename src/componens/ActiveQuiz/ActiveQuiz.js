import React from "react";
import classes from "./ActiveQuiz.module.css";
import AnswerList from "./AnswerList/AnswerList";

const ActiveQuiz = props => {
  return (
    <div className={classes.ActiveQuiz}>
      <p className={classes.Question }>
        <span>
          <strong>2.</strong>&nbsp;
          Как дела?
        </span>
        <small>3 и 5</small>
      </p>
     <AnswerList 
     answers={props.answers}
     />
    </div>
  );
};
export default ActiveQuiz;
