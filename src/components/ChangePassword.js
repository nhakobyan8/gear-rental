"use client";
import { useState } from "react";
import { changePassword } from "@/lib/api";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    try {
      await changePassword({ currentPassword, newPassword });
      setSuccess("Password changed successfully.");
    } catch (err) {
      setError("Failed to change password.");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-primary mb-4">Change Password</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="currentPassword" className="block mb-2 text-text-muted">Current Password</label>
          <input
            type="password"
            id="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="newPassword" className="block mb-2 text-text-muted">New Password</label>
          <input
            type="password"
            id="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="confirmPassword" className="block mb-2 text-text-muted">Confirm New Password</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 bg-background-light border border-gray-600 rounded-md text-text focus:outline-none focus:ring-2 focus:ring-primary-light"
            required
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">{success}</p>}
        <button type="submit" className="w-full mt-4 bg-primary text-white py-2 rounded-md hover:bg-primary-dark duration-300 ease-in-out transform transition-colors shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light">
          Change Password
        </button>
      </form>
    </div>
  );
}
