import React, { Component } from "react";
import "./App.css";
import RootLayout from "./layouts/RootLayout/RootLayout";
import Search from "./components/Search/Search";
import ProjectView from "./containers/ProjectView/ProjectView";

class App extends Component {
  constructor(props) {
    super(props);
    this.inputBoxRef = React.createRef();
  }
  onSubmitHandler = e => {
    e.preventDefault();
    console.log("blur form input from here. also from onclick");
    console.log(e.target.find.value);
  };
  render() {
    return (
      <div className="App">
        <RootLayout>
          <Search ref={this.inputBoxRef} submit={this.onSubmitHandler} />
          <ProjectView />
        </RootLayout>
      </div>
    );
  }
}

export default App;
