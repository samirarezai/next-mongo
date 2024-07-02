"use client"
import Image from "next/image";
import {useEffect, useState} from "react";
import axios from "axios";
import {string} from "prop-types";
import Add from "@/app/components/users/add";
import Search from "@/app/components/search";

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
        <Search></Search>
        <h1>Users</h1>
          {/*<Add callback={fetchUsers}/>*/}
        <ul>
          {!loading ? users.map((user: { _id: string, username: string, email: string, isVerified: number }) => (
              <li key={user._id}>
                {user.username} - {user.email} - {user.isVerified ? "Verified User" : "Unverified User"}
              </li>
          )) : <p>Loading...</p>}
        </ul>
      </main>
  );
}
