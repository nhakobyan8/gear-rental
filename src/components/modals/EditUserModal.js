import { useState, useEffect } from "react";
import Modal from "./Modal";

export default function EditUserModal({ isOpen, onClose, onSave, user }) {
   const [username, setUsername] = useState("");
   const [email, setEmail] = useState("");
   const [role, setRole] = useState("user");

   useEffect(() => {
      if (user) {
         setUsername(user.username);
         setEmail(user.email);
         setRole(user.role);
      }
   }, [user]);

   const handleSubmit = () => {
      onSave({ id: user._id, username, email, role });
   };

   if (!isOpen) return null;

   return (
      <Modal isOpen={isOpen} onClose={onClose}>
         <h2 className="text-2xl font-bold text-text-dark">Edit User</h2>
         <div className="mb-4">
            <label className="block text-text-muted mb-2">Username:</label>
            <input
               type="text"
               value={username}
               onChange={(e) => setUsername(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded bg-background-dark text-white"
            />
         </div>
         <div className="mb-4">
            <label className="block text-text-muted mb-2">Email:</label>
            <input
               type="email"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded bg-background-dark text-white"
            />
         </div>
         <div className="mb-4">
            <label className="block text-text-muted mb-2">Role:</label>
            <select
               value={role}
               onChange={(e) => setRole(e.target.value)}
               className="w-full p-2 border border-gray-300 rounded bg-background-dark text-white"
            >
               <option value="user">User</option>
               <option value="admin">Admin</option>
            </select>
         </div>
         <div className="flex justify-end">
            <button
               onClick={handleSubmit}
               className="bg-primary text-white px-4 py-2 rounded hover:bg-primary-dark"
            >
               Save Changes
            </button>
         </div>
      </Modal>
   );
}
