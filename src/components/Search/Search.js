import React, { useState } from "react";
import classes from "./Search.module.css";
const Search = props => {
  const hint = "Enter a repository name";
  const [findValue, setFindValue] = useState("");

  return (
    <div className={classes.Search}>
      <div className={classes.SearchAndSubmit}>
        <form className={classes.Form} onSubmit={props.submit}>
          <input
            name="find"
            placeholder={hint}
            value={findValue}
            onChange={event => setFindValue(event.target.value)}
          />
          <button type="submit">Find</button>
        </form>
      </div>
    </div>
  );
};
export default Search;
