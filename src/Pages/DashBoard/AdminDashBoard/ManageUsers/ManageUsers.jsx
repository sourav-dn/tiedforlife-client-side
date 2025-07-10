import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useState } from "react";
import Swal from "sweetalert2";
import { FaSearch, FaTrashAlt, FaUsers } from "react-icons/fa";


const ManageUsers = () => {

    const axiosSecure = useAxiosSecure();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            return res.data;
        },
    });
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`).then((res) => {
            // console.log(res.data);
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is an Admin Now!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const handleMakePremium = (user) => {
        axiosSecure.patch(`/users/premium/${user._id}`).then((res) => {
            if (res.data.modifiedCount > 0) {
                refetch();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${user.name} is a Premium User Now!`,
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        });
    };

    const handleDeleteUser = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/users/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success",
                            });
                        }
                    });
            }
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 text-center">
                Manage Users
            </h2>
            <p className="font-bold">Total users: {users.length}</p>
            {/* Search Input */}
            <div className="mb-4 flex justify-center">
                <div className="relative w-1/2">
                    <input
                        type="text"
                        placeholder="Search by name..."
                        className="border border-pink-300 px-4 py-2 rounded-md w-full pl-10"
                        value={searchTerm}
                        onChange={handleSearch}
                    />
                    <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500" />
                </div>
            </div>

            {/* table input */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-pink-300 shadow-lg">
                    <thead className="bg-pink-200 text-pink-900">
                        <tr>
                            <th className="border border-pink-300 px-4 py-2"></th>
                            <th className="border border-pink-300 px-4 py-2">User Name</th>
                            <th className="border border-pink-300 px-4 py-2">User Email</th>
                            <th className="border border-pink-300 px-4 py-2">Role</th>
                            <th className="border border-pink-300 px-4 py-2">
                                Make premium
                            </th>
                            <th className="border border-pink-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users
                            .filter((user) =>
                                user.name?.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map((user, index) => (
                                <tr key={user._id} className="bg-pink-50 hover:bg-pink-100">
                                    <td className="border border-pink-300 px-4 py-2">
                                        {index + 1}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2">
                                        {user.email}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2 text-center">
                                        {user.role === "admin" ? (
                                            "Admin"
                                        ) : (
                                            <button
                                                className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-700"
                                                onClick={() => handleMakeAdmin(user)}
                                            >
                                                <FaUsers />
                                            </button>
                                        )}
                                    </td>

                                    <td className="border border-pink-300 px-4 py-2 text-center">
                                        {user.status === "premium" ? (
                                            "Premium User"
                                        ) : (
                                            <button
                                                className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-300"
                                                onClick={() => handleMakePremium(user)}
                                            >
                                                Make Premium
                                            </button>
                                        )}
                                    </td>

                                    <td className="border border-pink-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => handleDeleteUser(user)}
                                            className="text-white px-3 py-1 rounded-md hover:bg-red-500"
                                        >
                                            <FaTrashAlt className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ManageUsers;