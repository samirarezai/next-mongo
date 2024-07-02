"use client"

import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "next/navigation";
import Link from "next/link";

const UserDetailsPage = () => {
    const [user, setUser] = useState({
        "_id": "",
        "username": "",
        "email": "",
        "password": "",
        "isVerified": false,
        "isAdmin": false,
    });
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

    const fetchUsers = async () => {
        try {
            const res = await axios.get(`/api/users/${id}`);
            console.log(res);
            setUser(res.data);
            setLoading(false);
        } catch (err) {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);


    if (loading) return <p className="text-center mt-5">Loading...</p>;
    if (!user) return <p className="text-center mt-5">User not found</p>;

    return (
        <>
            <div className="max-w-2xl mx-auto p-4 mt-10 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-4">User Details</h1>
                <div className="mb-4">
                    <label className="block text-gray-700">ID:</label>
                    <p className="text-gray-900">{user._id}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Username:</label>
                    <p className="text-gray-900">{user.username}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email:</label>
                    <p className="text-gray-900">{user.email}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password:</label>
                    <p className="text-gray-900">{user.password}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Verified:</label>
                    <p className="text-gray-900">{user.isVerified ? 'Yes' : 'No'}</p>
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Admin:</label>
                    <p className="text-gray-900">{user.isAdmin ? 'Yes' : 'No'}</p>
                </div>
            </div>
            <div className="flex justify-center my-4">
                <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Back</Link>
            </div>

        </>

    );
};

export default UserDetailsPage;