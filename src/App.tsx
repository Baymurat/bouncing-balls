import Desk from "./components/desk";
import BallsContainer from "./components/balls-container";
import { BallsContextProvider } from "./context/ballsContext";

import "../style/style.scss";

const App = () => (
  <div>
    <BallsContextProvider>
      <Desk>
        <BallsContainer />
      </Desk>
    </BallsContextProvider>
  </div>
);

export default App;
