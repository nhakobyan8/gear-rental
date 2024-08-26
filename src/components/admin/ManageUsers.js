import { useEffect, useState } from "react";

export default function ManageUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await fetch("/api/admin/users");
        if (!response.ok) {
          throw new Error("Failed to fetch users.");
        }
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user._id}>
            {user.username} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
