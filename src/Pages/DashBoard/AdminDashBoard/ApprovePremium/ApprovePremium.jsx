import { useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";


const ApprovePremium = () => {

    const [premiumUsers, setPremiumUsers] = useState([]);
    const axiosSecure = useAxiosSecure();

    const { data: users = [], refetch } = useQuery({
        queryKey: ["premiumRequest"],
        queryFn: async () => {
            const res = await axiosSecure.get("/premiumRequest");
            return res.data;
        },
        onError: (err) => {
            console.error("Error fetching premium requests:", err);
        },
    });


    const handleMakePremium = (user) => {
        setPremiumUsers([...premiumUsers, user._id]);

        axiosSecure
            .patch(`/premiumRequest/${user._id}`, { status: "premium" }) // Set to 'premium'
            .then((res) => {
                // console.log(res.data);
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now a Premium User!`,
                        showConfirmButton: false,
                        timer: 1500,
                    });
                }
            })
            .catch((error) => {
                console.log(error)
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: "Something went wrong!",
                    showConfirmButton: false,
                    timer: 1500,
                });
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
                axiosSecure
                    .delete(`/premium/${user._id}`)
                    .then((res) => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "The request has been deleted.",
                                icon: "success",
                            });
                        }
                    })
                    .catch((error) => {
                        console.log(error)
                        Swal.fire({
                            position: "top-end",
                            icon: "error",
                            title: "Failed to delete the user!",
                            showConfirmButton: false,
                            timer: 1500,
                        });
                    });
            }
        });
    };

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 text-center">
                Approved Premium Users
            </h2>

            {/* Table for Premium Requests */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-pink-300 shadow-lg">
                    <thead className="bg-pink-200 text-pink-900">
                        <tr>
                            <th className="border border-pink-300 px-4 py-2">Name</th>
                            <th className="border border-pink-300 px-4 py-2">Email</th>
                            <th className="border border-pink-300 px-4 py-2">Biodata Id</th>
                            <th className="border border-pink-300 px-4 py-2">
                                Make Premium
                            </th>
                            <th className="border border-pink-300 px-4 py-2">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="5"
                                    className="text-center py-4 text-xl font-semibold text-gray-600"
                                >
                                    No data available
                                </td>
                            </tr>
                        ) : (
                            users.map((user) => (
                                <tr key={user._id} className="bg-pink-50 hover:bg-pink-100">
                                    <td className="border border-pink-300 px-4 py-2">
                                        {user.name}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2">
                                        {user.email}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2">
                                        {user.biodataId}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2 text-center">
                                        {user.status === "premium" ||
                                            premiumUsers.includes(user._id) ? (
                                            <span className="text-green-500 font-semibold">
                                                Premium User
                                            </span>
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
                                            className="text-white px-3 py-1 rounded-md hover:bg-red-300"
                                        >
                                            <FaTrashAlt className="text-red-600" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovePremium;