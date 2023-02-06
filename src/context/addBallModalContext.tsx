import React, { FC, PropsWithChildren, useContext, useState } from "react";

type AddBallModalContextType = {
  isShown: boolean;
  openModal: () => void;
  closeModal: () => void;
}

const AddBallModalContext = React.createContext<AddBallModalContextType | null>(null);

export const AddModalProvider: FC<PropsWithChildren> = ({ children }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  
  return <AddBallModalContext.Provider 
    value={{
      isShown: showModal,
      openModal,
      closeModal,
    }}
  >
    {children}
  </AddBallModalContext.Provider>;
};

export const useAddBallModalContext = () => {
  const context = useContext(AddBallModalContext);

  if (context === null) {
    throw new Error(
      "useAddBallModalContext has to be used within <AddBallModalContext.Provider>"
    );
  }

  return context;
};