import React from "react";
import classes from "./RootLayout.module.css";

const RootLayout = props => {
  return <div className={classes.RootLayout}>{props.children}</div>;
};
export default RootLayout;
