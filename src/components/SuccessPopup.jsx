import React from "react";

function SuccessPopup({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/40">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-xs text-center">
        <h2 className="text-2xl font-bold mb-4 text-green-600">Deployment Submitted Successfully</h2>
        <button
          onClick={onClose}
          className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-xl shadow transition-all duration-200 mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default SuccessPopup;
