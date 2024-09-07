"use client";
import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "@/features/userSlice";
import { signIn } from "next-auth/react";
import Modal from "./Modal";

export default function LoginModal({ isOpen, onClose }) {
   const [formData, setFormData] = useState({ email: "", password: "" });
   const dispatch = useDispatch();
   const { loading, error } = useSelector((state) => state.users);
   const router = useRouter();

   const handleInputChange = useCallback((e) => {
      const { id, value } = e.target;
      setFormData((prevData) => ({ ...prevData, [id]: value }));
   }, []);

   const handleSubmit = useCallback(
      async (e) => {
         e.preventDefault();

         const action = await dispatch(loginUser({ email: formData.email, password: formData.password })).unwrap();

         if (!action.error) {
            router.push("/");
            onClose();
         };

      }, [dispatch, formData, router]);


   const handleGoogleSignIn = useCallback(() => {
      signIn("google", { callbackUrl: "/" });
   }, []);

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <h2 className="text-2xl font-bold mb-4">Login</h2>
         <form onSubmit={handleSubmit} className="bg-background-light rounded-lg shadow-lg w-full max-w-md">
            <div className="mb-4">
               <label htmlFor="email" className="block text-text-muted mb-2">Email</label>
               <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
               />
            </div>
            <div className="mb-6">
               <label htmlFor="password" className="block text-text-muted mb-2">Password</label>
               <input
                  type="password"
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-background text-text border border-background-dark rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light"
                  required
               />
            </div>
            <button
               type="submit"
               className="w-full bg-primary text-white py-3 rounded-md hover:bg-primary-dark transition-colors duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-primary-light"
               disabled={loading}
            >
               {loading ? "Processing..." : "Login"}
            </button>
            <button
               type="button"
               onClick={handleGoogleSignIn}
               className="w-full mt-4 bg-red-500 text-white py-3 rounded-md hover:bg-red-600 transition-colors duration-300 ease-in-out shadow-lg focus:outline-none focus:ring-2 focus:ring-red-400"
               disabled={loading}
            >
               Sign in with Google
            </button>
            {error && <p className="text-red-500 text-center mt-4">{error}</p>}
         </form>
      </Modal>

   );
}
