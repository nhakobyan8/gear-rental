"use client";
import { useEffect, useState } from "react";
import { FaSpinner, FaEdit, FaTrash } from "react-icons/fa";
import EditUserModal from "@/components/EditUserModal";

export default function ManageUsersPage() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  
  async function fetchUsers() {
    try {
      const response = await fetch("/api/admin/users");
      if (!response.ok) {
        throw new Error("Failed to fetch users.");
      }
      const data = await response.json();
      setUsers(data.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const handleSave = async (updatedUser) => {
    try {
      const response = await fetch("/api/admin/users", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedUser),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      setUsers(users.map(user => user._id === updatedUser.id ? updatedUser : user));
      setIsModalOpen(false);
      fetchUsers();
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        const response = await fetch("/api/admin/users", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          throw new Error("Failed to delete user.");
        }

        setUsers(users.filter(user => user._id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaSpinner className="animate-spin text-4xl text-text-muted" />
      </div>
    );
  }

  if (error) {
    return <div className="text-red-500 text-center">{error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-6 text-text-dark">Manage Users</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <div key={user._id} className="bg-background-dark border border-slate-400/20 rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="text-text-dark">
                <h3 className="text-lg font-semibold">{user.username}</h3>
                <p className="text-text-muted">{user.email}</p>
              </div>
            </div>
            <div className="text-text-dark mb-4">
              <p>Role: <span className="font-bold">{user.role}</span></p>
            </div>
            <div className="flex justify-between items-center">
              <button
                className="text-blue-400 hover:underline"
                onClick={() => handleEdit(user)}
              >
                <FaEdit />
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(user._id)}
              >
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <EditUserModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSave}
          user={currentUser}
        />
      )}
    </div>
  );
}
