import { useState } from "react";
import ConfirmationTooltip from "./ConfirmationTooltip";

/* eslint-disable react/prop-types */
const DeleteButton = ({ deleteItem, id }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleDelete = () => {
    setShowTooltip(true);
  };
  const handleConfirm = () => {
    deleteItem(id);
    setShowTooltip(false);
  };

  const handleCancel = () => {
    setShowTooltip(false);
  };

  return (
    <>
      <i className="fa-solid fa-trash hover:text-red-600 transform hover:translate-y-[-2px] transition duration-200 ease-in-out" onClick={handleDelete}></i>
      {showTooltip && (
        <ConfirmationTooltip
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      )}
    </>
  );
};

export default DeleteButton;
