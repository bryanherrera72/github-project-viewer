import React, { Component } from "react";
import "./App.css";
import RootLayout from "./layouts/RootLayout/RootLayout";
import ProjectView from "./containers/ProjectView/ProjectView";
import { getProject } from "./util/data/fetch";
class App extends Component {
  constructor(props) {
    super(props);
    this.inputBoxRef = React.createRef();
  }
  state = {
    repo: {
      title: ""
    },
    isFetching: false,
    didInvalidate: false
  };

  onSubmitHandler = e => {
    e.preventDefault();
    let fullName = e.target.find.value;
    fullName = fullName.replace(/\s+/g, "");
    const [username, repoTitle] = fullName.split("/");
    getProject(fullName)
      .then(repo => console.log(repo))
      .catch(e => console.log(e));
    this.setState({
      repo: {
        title: repoTitle
      },
      isFetching: false,
      didInvalidate: false
    });
  };
  render() {
    return (
      <div className="App">
        <RootLayout>
          <ProjectView submit={this.onSubmitHandler} repo={this.state.repo} />
        </RootLayout>
      </div>
    );
  }
}

export default App;
