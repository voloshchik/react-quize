import React, { Component } from "react";
import classes from "./layout.module.css";
import MenuToggle from "../../componens/Navigation/MenuToggle/MenuToggle";
import Drower from "../../componens/Navigation/Drower/Drower";
import { connect } from "react-redux";
class Layout extends Component {
  state = {
    menu: false
  };
  onToggleHandler = props => {
    this.setState({
      menu: !this.state.menu
    });
  };
  menuCloseHandler = () => {
    this.setState({
      menu: false
    });
  };
  render() {
    return (
      <div className={classes.Layout}>
        <Drower
          isAuthenticated={this.props.isAuthenticated}
          isOpen={this.state.menu}
          onClose={this.menuCloseHandler}
        />
        <MenuToggle isOpen={this.state.menu} onToggle={this.onToggleHandler} />
        <main>{this.props.children}</main>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    isAuthenticated: !!state.auth.token
  };
}
export default connect(mapStateToProps)(Layout);
