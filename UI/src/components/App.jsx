import React, { Component } from 'react';
import Calculator from "./calculator";
import 'bootstrap/dist/css/bootstrap.css';
import LoggingSection from './loggingSection';


class App extends Component {
  render() { 
    return (
      <React.Fragment>
        <Calculator />
        <LoggingSection />
      </React.Fragment>
    );
  }
}
 
export default App;
