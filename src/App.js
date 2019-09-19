import React, { Component } from "react";
import "./App.css";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Search from "./components/Search/Search";
import ProjectView from "./containers/ProjectView/ProjectView";

class App extends Component {
  onSubmitHandler = e => {
    e.preventDefault();

    console.log(e.target.find.value);
  };
  render() {
    return (
      <div className="App">
        <RootLayout>
          <Search submit={this.onSubmitHandler} />
          <ProjectView />
        </RootLayout>
      </div>
    );
  }
}

export default App;
