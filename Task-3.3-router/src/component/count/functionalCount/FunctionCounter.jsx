import React, { useState } from "react";
import style from '../Count.module.css'

export const FunctionCounter = () => {
  const [state, setState] = useState(0);

  const onUp = () => {
    setState(state + 1);
  };

  const onDown = () => {
    setState(state - 1);
  };

  return (
    <div className={style.containerForFunction}>
      <h1>Functional Component</h1>
      <h2>{state}</h2>
      <button onClick={onUp}>Up</button>
      <button onClick={onDown}>Down</button>
    </div>
  );
};
