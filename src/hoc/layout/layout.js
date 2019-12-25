import React, { Component } from "react";
import classes from "./layout.module.css";
import MenuToggle from "../../componens/Navigation/MenuToggle/MenuToggle";
import Drower from '../../componens/Navigation/Drower/Drower';
class Layout extends Component {
  state = {
    menu: false
  };
  onToggleHandler = props => {
    this.setState({
      menu: !this.state.menu
    });
  };
  menuCloseHandler=()=>{
    this.setState({
      menu:false
    })
  }
  render() {
    return (
      <div className={classes.Layout}>
          <Drower isOpen={this.state.menu} onClose={this.menuCloseHandler}/>
        <MenuToggle
          isOpen={this.state.menu}
          onToggle={this.onToggleHandler}
        />
        <main>{this.props.children}</main>
      </div>
    );
  }
}

export default Layout;
