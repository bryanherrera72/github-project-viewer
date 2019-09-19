import React, { Component } from "react";
import classes from "./Search.module.css";
class Search extends Component {
  state = {
    findValue: ""
  };
  onChangeHandler = event => {
    console.log(event.target.value);
    this.setState({
      findValue: event.target.value
    });
  };
  onClickFocus = () => {
    this.inputForm.focus();
  };

  render() {
    return (
      <div className={classes.Search}>
        <div className={classes.SearchAndSubmit}>
          <form className={classes.Form} onSubmit={this.props.submit}>
            <input
              ref={ref => {
                this.inputForm = ref;
              }}
              name="find"
              onClick={this.onClickFocus}
              placeholder={"Enter a repository name."}
              value={this.state.findValue}
              onChange={this.onChangeHandler}
            />
            <button type="submit">Find</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
