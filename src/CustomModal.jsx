import React from "react";
import { useSelector } from "react-redux";

function CustomModal({ id, showPopup, setShowPopup }) {
  const user = useSelector((state) => state.app.user);
  const sigleUser = user?.filter((users) => users.id == id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
      <div className="relative bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <button 
          className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
          onClick={() => setShowPopup(false)}
        >
          Close
        </button>
        
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">{sigleUser[0].name}</h1>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm font-medium text-gray-500">Email</p>
              <p className="text-gray-700">{sigleUser[0].email}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Age</p>
              <p className="text-gray-700">{sigleUser[0].age}</p>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Gender</p>
              <p className="text-gray-700 capitalize">{sigleUser[0].gender}</p>
            </div>
          </div>
          
          <div>
            <p className="text-sm font-medium text-gray-500">Message</p>
            <p className="text-gray-700 whitespace-pre-wrap p-3 bg-gray-50 rounded-md">
              {sigleUser[0].msg}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomModal;