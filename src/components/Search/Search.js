import React, { Component } from "react";
import classes from "./Search.module.css";
class Search extends Component {
  state = {
    findValue: ""
  };
  onChangeHandler = event => {
    this.setState({
      findValue: event.target.value
    });
  };

  render() {
    return (
      <div className={classes.Search}>
        <div className={classes.SearchAndSubmit}>
          <form className={classes.Form} onSubmit={this.props.submit}>
            <input
              name="find"
              placeholder={"Enter a repository name."}
              value={this.state.findValue}
              onChange={this.onChangeHandler}
            />
            <button type="submit">Go</button>
          </form>
        </div>
      </div>
    );
  }
}
export default Search;
