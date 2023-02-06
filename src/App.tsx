import Desk from "./components/desk";
import BallsContainer from "./components/balls-container";
import { BallsContextProvider } from "./context/ballsContext";
import { AddModalProvider } from "./context/addBallModalContext";

import "../style/style.scss";

const App = () => (
  <div>
    <BallsContextProvider>
      <AddModalProvider>
        <Desk>
          <BallsContainer />
        </Desk>
      </AddModalProvider>
    </BallsContextProvider>
  </div>
);

export default App;
