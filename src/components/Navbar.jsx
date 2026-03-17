import React from "react";
import { FaStepBackward } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Navbar({ clientName, onAddDeployment, isAdminOrDev }) {
  const navigate = useNavigate();
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow rounded-2xl mb-6">
      <div className="flex items-center gap-3">
        {isAdminOrDev && (
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-9 h-9 rounded-full bg-blue-100 hover:bg-blue-200 text-blue-700 text-lg font-bold mr-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            title="Go Back"
            aria-label="Go Back"
          >
            <FaStepBackward className="w-5 h-5" />
          </button>
        )}
        <span className="font-bold text-xl text-blue-700 truncate max-w-xs" title={clientName}>
          {clientName}
        </span>
      </div>
      {isAdminOrDev && (
        <button
          onClick={onAddDeployment}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-xl shadow transition-all duration-200"
        >
          + Add Deployment
        </button>
      )}
    </nav>
  );
}

export default Navbar;
