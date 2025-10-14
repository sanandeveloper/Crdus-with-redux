import React from "react";
import { useSelector } from "react-redux";

function CustomModal({ id, showPopup, setShowPopup }) {
  const user = useSelector((state) => state.app.user);
  const singleUser = user?.find((u) => u.id === id);

  if (!showPopup || !singleUser) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4 sm:p-6">
      <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-md sm:max-w-lg md:max-w-xl overflow-y-auto max-h-[90vh] p-6 sm:p-8 transition-all duration-300">
        {/* Close Button */}
        <button
          className="absolute top-3 right-3 sm:top-4 sm:right-4 px-2 sm:px-3 py-1 bg-red-500 text-white text-sm sm:text-base rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transition"
          onClick={() => setShowPopup(false)}
        >
          ✕
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 break-words">
            {singleUser.name}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            User Details Overview
          </p>
        </div>

        {/* User Info Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
              Email
            </p>
            <p className="text-gray-800 break-all text-sm sm:text-base">
              {singleUser.email}
            </p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
              Age
            </p>
            <p className="text-gray-800 text-sm sm:text-base">{singleUser.age}</p>
          </div>

          <div>
            <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide">
              Gender
            </p>
            <p className="text-gray-800 capitalize text-sm sm:text-base">
              {singleUser.gender}
            </p>
          </div>
        </div>

        {/* Message Section */}
        <div>
          <p className="text-xs sm:text-sm font-medium text-gray-500 uppercase tracking-wide mb-2">
            Message
          </p>
          <p className="text-gray-800 text-sm sm:text-base whitespace-pre-wrap bg-gray-50 rounded-lg p-3 sm:p-4 border border-gray-200">
            {singleUser.msg}
          </p>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;
