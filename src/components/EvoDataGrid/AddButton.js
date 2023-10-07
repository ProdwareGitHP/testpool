import React, { useState } from "react";
import { EvoButton } from "../EvoButton";

export const AddButton = ({ Creator: AddComponentModal, onCreated }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleSuccess = (data) => {
    onCreated(data);
    handleClose();
  };
  return (
    <>
      <EvoButton btnText="+ New" onClick={() => handleOpenModal()} />
      {isOpen && AddComponentModal && (
        <AddComponentModal
          handleClose={handleClose}
          onSuccess={handleSuccess}
        />
      )}
    </>
  );
};
