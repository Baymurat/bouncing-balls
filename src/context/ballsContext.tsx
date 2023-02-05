import React, { FC, PropsWithChildren, useContext, useState } from "react";
import { Ball as BallType } from "../types/types";
import { Thread } from "../helpers/thread";

type BallsContextType = {
  balls: BallType[];
  threads: Thread[];
  addBall: (ball: BallType) => void;
  addThread: (thread: Thread) => void;
  clearDesk: () => void;
}

const BallsContext = React.createContext<BallsContextType | null>(null);

export const BallsContextProvider: FC<PropsWithChildren>= ({ children }) => {
  const [balls, setBalls] = useState<BallType[]>([]);
  const [threads, setThreads] = useState<Thread[]>([]);

  const addBall = (ball: BallType) => setBalls((balls) => [...balls, ball]);
  const addThread = (thread: Thread) => setThreads((threads) => [...threads, thread]);
  const clearDesk = () => {
    setBalls([]);
    setThreads([]);
  };
  
  return (
    <BallsContext.Provider value={{
      balls,
      threads,
      addBall,
      addThread,
      clearDesk,
    }}>
      {children}
    </BallsContext.Provider>
  );
};

export const useBallsContext = () => {
  const context = useContext(BallsContext);

  if (context === null) {
    throw new Error(
      "useBallsContext has to be used within <BallsContext.Provider>"
    );
  }

  return context;
};
