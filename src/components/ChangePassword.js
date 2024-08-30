"use client";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserPassword, resetError, resetPasswordChangeSuccess } from "@/features/userSlice";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const { loading, error, passwordChangeSuccess } = useSelector((state) => state.users);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const [serverError, setServerError] = useState(null);

  const resetFeedback = () => {
    if (error) dispatch(resetError());
    if (passwordChangeSuccess) dispatch(resetPasswordChangeSuccess());
    setServerError(null);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value
    });
    resetFeedback();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFeedback();

    const { currentPassword, newPassword, confirmPassword } = passwordData;

    if (newPassword === currentPassword) {
      setServerError("New password must be different from the current password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setServerError("New passwords do not match.");
      return;
    }

    try {
      await dispatch(changeUserPassword({ currentPassword, newPassword })).unwrap();
      setServerError(null);
      setSuccess("Password changed successfully.");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (err) {
      setServerError(err);
    }
  };

  return (
    <div className="w-full py-5 h-full">
      <div className="w-full h-full flex-none md:flex flex-col justify-center">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="currentPassword" className="block mb-2 text-text-muted">
              Current Password
            </label>
            <input
              type="password"
              id="currentPassword"
              name="currentPassword"
              value={passwordData.currentPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="newPassword" className="block mb-2 text-text-muted">
              New Password
            </label>
            <input
              type="password"
              id="newPassword"
              name="newPassword"
              value={passwordData.newPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
              disabled={loading}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block mb-2 text-text-muted">
              Confirm New Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={passwordData.confirmPassword}
              onChange={handleInputChange}
              className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
              required
              disabled={loading}
            />
          </div>
          {serverError && <p aria-live="assertive" className="text-red-500">{serverError}</p>}
          {passwordChangeSuccess && (
            <p aria-live="polite" className="text-green-500">Password changed successfully.</p>
          )}
          <button
            type="submit"
            className={`w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark duration-300 ease-in-out transform transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light ${loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            disabled={loading}
          >
            {loading ? "Changing Password..." : "Change Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
