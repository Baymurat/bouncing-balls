import React from "react";
import Desk from "./components/desk";
import BallsContainer from "./components/balls-container";
import "../style/style.scss";

const App = () => (
  <div>
    <Desk>
      <BallsContainer />
    </Desk>
  </div>
);

export default App;
