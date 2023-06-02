import React from "react";
import style from '../Count.module.css'

export class ClassCounter extends React.Component {
  constructor() {
    super();
    this.state = {
      counter: 0
    };
  }

  onClickUp = () => {
    this.setState(prevState => {
      return {
        counter: prevState.counter + 1
      };
    });
  };

  onClickDown = () => {
    this.setState(prevState => {
      return {
        counter: prevState.counter - 1
      };
    });
  };

  render() {
    return (
      <div className={style.containerForClass}>
        <h1>Class Component</h1>
        <h2>
          {this.state.counter}
        </h2>
        <button onClick={this.onClickUp}>Up</button>
        <button onClick={this.onClickDown}>Down</button>
      </div>
    );
  }
}
