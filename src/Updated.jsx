import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "./store/userDeatils";

function Updated() {
  const { id } = useParams();
  console.log("id====>", id);
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const loading=useSelector((state)=>state.app.loading)

  const [edit, setEdit] = useState({
    name: "",
    email: "",
    age:'',
    gender:'',
    msg:''
  });

  const user = useSelector((state) => state.app.user);

  useEffect(() => {
    if (id) {
      const signleUser = user.filter((ele) => ele.id == id);
      console.log("signleUser --->",signleUser);

      
      setEdit({
        ...edit,
        name:signleUser[0].name,
        email:signleUser[0].email,
        age:signleUser[0].age,
        gender:signleUser[0].gender,
        msg:signleUser[0].msg

      });
    }
  }, []);

  const newData = (e) => {
   
    const {name,value}=e.target
    setEdit((prev)=>({
      ...prev,
      [name]:value
    }))
    
  };

   const handleSubmit=(e)=>{
      e.preventDefault()

      if (id && user) {
        dispatch(editUser({...edit,id}))
        navigate('/allpost')
                 
      }
     
   }
   

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-4xl">
        <div className="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
          <div className="mb-8 text-center">
            <h2 className="text-3xl font-extrabold text-gray-900">Edit User</h2>
            <p className="mt-2 text-sm text-gray-600">Edit Your Data Here</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={edit && edit.name}
                    onChange={newData}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email Address <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={edit && edit.email}
                                        onChange={newData}

                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Age Field */}
              <div>
                <label
                  htmlFor="age"
                  className="block text-sm font-medium text-gray-700"
                >
                  Age <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <input
                    id="age"
                    type="number"
                    name="age"
                    placeholder="28"
                    min="18"
                    max="100"
                    value={edit && edit?.age}
                    onChange={newData}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              {/* Gender Field */}
              <div>
                <label
                  htmlFor="gender"
                  className="block text-sm font-medium text-gray-700"
                >
                  Gender <span className="text-red-500">*</span>
                </label>
                <div className="mt-1">
                  <select
                    id="gender"
                    name="gender"
                    value={edit && edit?.gender

                    }
                                        onChange={newData}

                    // onChange={(e) => setGender(e.target.value)}
                    className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="transgender">Transgender</option>
                    <option value="other">Other</option>
                    <option value="prefer-not-to-say">Prefer not to say</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Message Field */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message <span className="text-red-500">*</span>
              </label>
              <div className="mt-1">
                <textarea
                  id="message"
                  name="msg"
                  rows={4}
                  value={edit && edit?.msg}
                  //   onChange={(e) => setMsg(e.target.value)}
                                      onChange={newData}

                  className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your message here..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
              
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                 {loading ? (
                  'Updating...'
                 ):'Update'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Updated;
