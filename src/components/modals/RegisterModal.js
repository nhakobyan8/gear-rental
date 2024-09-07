"use client";
import { useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/features/userSlice";
import Modal from "./Modal";

export default function RegisterModal({ isOpen, onClose }) {
   const [formData, setFormData] = useState({
      email: "",
      password: "",
      username: "",
      confirmationCode: "",
   });

   const [isCodeSent, setIsCodeSent] = useState(false);
   const dispatch = useDispatch();
   const { loading, error } = useSelector((state) => state.users);


   const handleInputChange = useCallback((e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
   }, [setFormData]);

   const handleSubmit = useCallback(
      async (e) => {
         e.preventDefault();

         if (!isCodeSent) {
            try {
               const action = await dispatch(registerUser({ ...formData, isRegister: true }));
               if (!action.error) {
                  alert("Confirmation code sent to your email. Please check your email.");
                  setIsCodeSent(true);
               } else {
                  alert(action.payload);
               }
            } catch (error) {
               console.error("Registration error:", error);
            }
         } else {
            try {
               const action = await dispatch(registerUser({ ...formData, isRegister: true, isCodeSent: true }));
               if (!action.error) {
                  alert("Registration successful! You can now log in.");
                  onClose();
                  setIsCodeSent(false);
                  setFormData({ email: "", password: "", username: "", confirmationCode: "" });
               } else {
                  alert(action.payload);
               }
            } catch (error) {
               console.error("Error during code confirmation:", error);
            }
         }
      },
      [dispatch, formData, isCodeSent, onClose]
   );

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <h2 className="text-2xl font-bold mb-4">Register</h2>
         <form onSubmit={handleSubmit} className="bg-background-light rounded-lg shadow-lg w-full max-w-md">

            <div className="mb-4">
               <label htmlFor="username" className="block text-text-muted mb-2">Username</label>
               <input
                  type="text"
                  id="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
               />
            </div>
            <div className="mb-4">
               <label htmlFor="email" className="block text-text-muted mb-2">Email</label>
               <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
               />
            </div>
            <div className="mb-6">
               <label htmlFor="password" className="block text-text-muted mb-2">Password</label>
               <input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
               />
            </div>
            {isCodeSent && (
               <div className="mb-4">
                  <label htmlFor="confirmationCode" className="block text-text-muted mb-2">Confirmation Code</label>
                  <input
                     type="text"
                     id="confirmationCode"
                     value={formData.confirmationCode}
                     onChange={handleInputChange}
                     className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                     required
                  />
               </div>
            )}
            <button
               type="submit"
               className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
               disabled={loading}
            >
               {loading ? "Processing..." : isCodeSent ? "Create Account" : "Send Code"}
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
         </form>
      </Modal>
   );
}
