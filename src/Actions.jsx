import React, { useState } from 'react';
import { BsThreeDotsVertical } from "react-icons/bs";
import { MdCancel, MdEdit, MdDelete, MdVisibility } from "react-icons/md";
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

function Actions({ onView, onEdit, onDelete }) {
   
     const  authStatus=useSelector(state=>state.app.status)


    return (
        <div className=" ">
            
           
                    <div className=" flex items-center gap-2">
                           
                            <button
                                onClick={() => {
                                  if (authStatus) {
                                      onView();
                                  }else{
                                    toast.error('please login first')
                                  }
                                    
                                }}
                                className="flex items-center cursor-pointer  py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <MdVisibility className="" />
                                
                            </button>
                        
                       
                            <button
                                onClick={() => {
                                    if (authStatus) {
                                        onEdit();
                                    }else{
                                    toast.error('please login first')
                                  }
                                    
                                }}
                                className="flex items-center  cursor-pointer   px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            >
                                <MdEdit className="" />
                                
                            </button>
                        
                      
                            <button
                                onClick={() => {
                                    if (authStatus) {
                                        onDelete();
                                        
                                    }else{
                                    toast.error('please login first')
                                  }
                                    // setShowActions(false);
                                }}
                                className="flex items-center  cursor-pointer   py-2 text-sm text-red-600 hover:bg-gray-100"
                            >
                                <MdDelete className="" />
                            </button>
                      
                    </div>
                </div>
        
    );
}

export default Actions;