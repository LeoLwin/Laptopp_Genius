/* eslint-disable react/prop-types */

const ConfirmationTooltip = ({ onConfirm, onCancel }) => {
  return (
    <div className="bg-white border border-gray-300 p-4 rounded shadow-lg absolute top-0 left-1/2 transform -translate-x-1/2 z-10">
      <p className="mb-4">Are you sure you want to delete this item?</p>
      <div className="flex justify-between">
        <button className="btn btn-danger bg-red-500 text-white px-3 py-1 rounded mr-2" onClick={onConfirm}>Yes</button>
        <button className="btn btn-secondary bg-gray-300 text-gray-700 px-3 py-1 rounded" onClick={onCancel}>No</button>
      </div>
    </div>
  );
};

export default ConfirmationTooltip;

