import React from "react";
import Layout from "./hoc/layout/layout";
import Quiz from "./containers/Quiz/Quiz";
import { Switch, Route, Redirect } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import QuizCreator from "./containers/QuizCreator/QuizCreator";
import QuizList from "./containers/QuizList/QuizList";
import { connect } from "react-redux";
import { Logout } from "./componens/Logout/Logout";
class App extends React.Component {
  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/quiz/:id" component={Quiz} />
        <Route path="/" component={QuizList} />

        <Redirect to={"/"} />
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/quiz-creator" component={QuizCreator} />
          <Route path="/quiz/:id" component={Quiz} />
          <Route path="/" component={QuizList} />
          <Router patch="/logout" component={Logout} />
          <Redirect to={"/"} />
        </Switch>
      );
    }
    return <Layout>{routes}</Layout>;
  }
}

function mapStateToProps(dispatch) {
  return {
    isAuthenticated: !!state.auth.token
  };
}

export default connect(mapStateToProps)(App);
