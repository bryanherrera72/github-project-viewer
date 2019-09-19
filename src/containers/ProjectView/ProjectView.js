import React, { Component } from "react";
import classes from "./ProjectView.module.css";

class ProjectView extends Component {
  render() {
    let width = window.innerWidth,
      height = window.innerHeight;
    return (
      <div className={classes.ProjectView}>
        <canvas width={width} height={height}></canvas>
      </div>
    );
  }
}
export default ProjectView;
