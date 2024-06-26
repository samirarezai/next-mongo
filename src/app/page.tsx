"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import {string} from "prop-types";
import Add from "@/app/components/users/add";

export default function Home() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUsers = async () => {
    try {
      const res = await axios.get('/api/users');
      setUsers(res.data);
      setLoading(false);
    } catch (err) {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1>Users</h1>
          <Add callback={fetchUsers}/>
        <ul>
          {!loading ? users.map((user: { _id: string, name: string, email: string, age: number }) => (
              <li key={user._id}>
                {user.name} - {user.email} - {user.age}
              </li>
          )) : <p>Loading...</p>}
        </ul>
      </main>
  );
}
