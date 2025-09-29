import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, showUser } from "./store/userDeatils";
import CustomModal from "./CustomModal";
import Actions from "./Actions"; // Import the Actions component
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
    // console.log('user==>',user)
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-xl">Loading...</span>
      </div>
    );
  }

  console.log('user==>',user)

  return (
    <div className="container mx-auto px-4 py-8">
      {pop && <CustomModal id={id} showPopup={pop} setShowPopup={setPop} />}

      <div className="">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Age</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>

          <tbody className="bg-white divide-y divide-gray-200">
            {user?.map((item) => (
              <tr  onDoubleClick={()=>[setPop(true),setId(item.id)]} key={item.id}>
                <td  className="px-6 cursor-pointer py-4 whitespace-nowrap text-sm text-gray-500">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.age}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gender}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Actions  
                    onView={()=>[setPop(true),setId(item.id)]}
                    onEdit={()=> navigate(`/updated/${item.id}`)}
                    onDelete={()=>dispatch(deleteUser(item.id))}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Allpost;