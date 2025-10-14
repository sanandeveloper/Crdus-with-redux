import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "./store/userDeatils";
import CustomModal from "./CustomModal";
import Actions from "./Actions";
import { useNavigate } from "react-router-dom";

function Allpost() {
  const dispatch = useDispatch();
  const [pop, setPop] = useState(false);
  const [id, setId] = useState();
  const navigate = useNavigate();

  const user = useSelector((state) => state.app.user);
  const loading = useSelector((state) => state.app.loading);

  useEffect(() => {
    dispatch(showUser());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-xl">Loading...</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {pop && <CustomModal id={id} showPopup={pop} setShowPopup={setPop} />}

      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center md:text-left">
        All Users
      </h2>

      {/* ---------- TABLE VIEW (only for sm and up) ---------- */}
      <div className="hidden sm:block overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full border border-gray-200 text-sm md:text-base">
          <thead className="bg-gray-100 text-gray-600 uppercase text-xs md:text-sm">
            <tr>
              <th className="px-4 md:px-6 py-3 text-left font-medium">Name</th>
              <th className="px-4 md:px-6 py-3 text-left font-medium">Email</th>
              <th className="px-4 md:px-6 py-3 text-left font-medium">Age</th>
              <th className="px-4 md:px-6 py-3 text-left font-medium">Gender</th>
              <th className="px-4 md:px-6 py-3 text-left font-medium">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {user?.length > 0 ? (
              user.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 cursor-pointer"
                  onDoubleClick={() => [setPop(true), setId(item.id)]}
                >
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap text-gray-700">
                    {item.name}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap text-gray-700 break-words">
                    {item.email}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap text-gray-700">
                    {item.age}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap text-gray-700 capitalize">
                    {item.gender}
                  </td>
                  <td className="px-4 md:px-6 py-3 whitespace-nowrap text-gray-700">
                    <Actions
                      onView={() => [setPop(true), setId(item.id)]}
                      onEdit={() => navigate(`/updated/${item.id}`)}
                      onDelete={() => dispatch(deleteUser(item.id))}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="text-center py-6 text-gray-500 text-sm md:text-base"
                >
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>


      <div className="grid grid-cols-1 gap-4 mt-6 sm:hidden">
        {user?.length > 0 ? (
          user.map((item) => (
            <div
              key={item.id}
              onDoubleClick={() => [setPop(true), setId(item.id)]}
              className="border border-gray-200 rounded-lg shadow-sm p-4 bg-white hover:shadow-md transition"
            >
              <p className="text-gray-800 font-semibold">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.email}</p>
              <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
                <span>Age: {item.age}</span>
                <span className="capitalize">Gender: {item.gender}</span>
              </div>
              <div className="mt-3">
                <Actions
                  onView={() => [setPop(true), setId(item.id)]}
                  onEdit={() => navigate(`/updated/${item.id}`)}
                  onDelete={() => dispatch(deleteUser(item.id))}
                />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 text-sm">No users found.</p>
        )}
      </div>
    </div>
  );
}

export default Allpost;
