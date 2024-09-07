"use client";
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUserProfile, updateUserProfile } from '@/features/userSlice';
import ChangePassword from '@/components/ChangePassword';
import UserOrders from '@/components/UserOrders';
import { FaSpinner, FaPencilAlt } from 'react-icons/fa';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { profile, loading, error } = useSelector((state) => state.users);
  const [isEditingUsername, setIsEditingUsername] = useState(false);
  const [username, setUsername] = useState("");
  const [isPasswordOpen, setIsPasswordOpen] = useState(false);
  const [usernameError, setUsernameError] = useState(null);
  const [usernameSuccess, setUsernameSuccess] = useState(null);

  useEffect(() => {
    dispatch(fetchUserProfile());
  }, [dispatch]);


  const handleUsernameSubmit = async (e) => {
    e.preventDefault();
    setUsernameError(null);
    setUsernameSuccess(null);
    try {
      await dispatch(updateUserProfile({ username })).unwrap();
      setIsEditingUsername(false);
      setUsernameSuccess("Username updated successfully.");
      dispatch(fetchUserProfile());
    } catch (err) {
      setUsernameError(`Failed to update username: ${err}`);
    }
  };

  const togglePassword = () => {
    setIsPasswordOpen(!isPasswordOpen);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-text-muted" />
      </div>
    );
  }

  if (error) {
    return <p className="text-red-500 text-center mt-4">Error: {error}</p>;
  }

  return (
    <div className='bg-gray-900'>
      <div className="container mx-auto p-6 min-h-screen justify-center flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
        <div className="md:w-3/4 space-y-6">
          <div id="profile-info" className="bg-gray-800 border border-slate-400/20 shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-primary mb-6">Profile Information</h2>
            <div className="flex items-end flex-wrap justify-between pt-5">
              <div className="flex flex-col mb-4 space-y-3">
                {isEditingUsername ? (
                  <form onSubmit={handleUsernameSubmit} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                    <div className="flex space-x-2">
                      <button
                        type="submit"
                        className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark duration-300 ease-in-out transform transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
                      >
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={() => setIsEditingUsername(false)}
                        className="bg-gray-300 text-black py-2 px-4 rounded-md hover:bg-gray-400 duration-300 ease-in-out transform transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex items-center">
                    <p className="text-lg text-text mr-2"><strong>Name:</strong> {profile?.username}</p>
                    <FaPencilAlt
                      onClick={() => setIsEditingUsername(true)}
                      className="text-primary cursor-pointer hover:text-primary-dark transition duration-300"
                    />
                  </div>
                )}
                <p className="text-lg text-text mr-2"><strong>Email:</strong> {profile?.email}</p>
                {usernameError && <p className="text-red-500 text-sm">{usernameError}</p>}
                {usernameSuccess && <p className="text-green-500 text-sm">{usernameSuccess}</p>}
              </div>
              <button
                onClick={togglePassword}
                className="bg-primary text-white py-2 px-4 rounded-md hover:bg-primary-dark duration-300 ease-in-out transform transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light mb-4"
              >
                {isPasswordOpen ? "Close Password Form" : "Change Password"}
              </button>
            </div>
            {isPasswordOpen && (
              <ChangePassword />
            )}
          </div>
          <div id="orders" className="bg-gray-800 border border-slate-400/20 shadow-lg rounded-lg px-3 p-6">
            <UserOrders />
          </div>
        </div>
      </div>
    </div>

  );
};

export default UserProfile;
