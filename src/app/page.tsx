"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/api/users');
        setUsers(res.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Users</h1>
        <ul>
          {users.map(user => (
              <li key={user._id}>
                {user.name} - {user.email} - {user.age}
              </li>
          ))}
        </ul>
      </main>
  );
}
