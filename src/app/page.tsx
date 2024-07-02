"use client"
import {useEffect, useState} from "react";
import axios from "axios";
import {useRouter} from "next/navigation";
import Link from "next/link";

export default function Home() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

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

    const logout = async () => {
        try {
            await axios.get('/api/users/logout');
            router.push('/login')
        } catch (error: any) {
            console.log(error.message)

        }

    }

    return (
        <main className="flex min-h-screen flex-col items-center justify-between p-24">
            <h1 className="text-3xl">Users</h1>

            <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                <tr>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Name
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Email
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                    </th>
                    <th scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Operation
                    </th>
                </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user: { _id: string, username: string, email: string, isVerified: number }) => (
                    <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.username}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                            {user.email}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-red-500">
                            {user.isVerified ? "Verified" : "unverified"}
                        </td>
                        <td>
                            <Link href={`/user/${user._id}`}>Detail</Link>
                        </td>
                    </tr>
                ))}


                </tbody>
            </table>
            {loading && <p>Loading...</p>}

            <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={() => logout()}>Log Out
            </button>
        </main>
    );
}
