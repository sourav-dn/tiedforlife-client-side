import { useMutation, useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";


const ContactRequest = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    // Fetch contact requests
    const { data: payments = [], error, isLoading, refetch } = useQuery({
        queryKey: ["contact-info", user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/contact/${user.email}`);
            return Array.isArray(res.data) ? res.data : [res.data];
        },
    });

    // Handle delete request
    const handleDelete = async (_id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const res = await axiosSecure.delete(`/contact/${_id}`);
                    if (res.data.deletedCount > 0) {
                        Swal.fire("Deleted!", "Your contact request has been deleted.", "success");
                        refetch();
                    }
                } catch (error) {
                    console.log(error)
                    Swal.fire("Error!", "Failed to delete contact request.", "error");
                }
            }
        });
    };


    // Mutation for updating the status of a contact request
    const updateStatusMutation = useMutation({
        mutationFn: ({ _id, status }) => axiosSecure.patch(`/contact/${_id}`, { status }),
        onSuccess: () => {
            Swal.fire("Status Updated!", "The status has been successfully updated.", "success");
            refetch(); // Refetch the data to show the updated status and contact info
        },
        onError: () => {
            Swal.fire("Error!", "Failed to update the status.", "error");
        },
    });

    const handleStatusChange = (_id, status) => {
        const newStatus = status === "Pending" ? "Approved" : "Pending"; // Toggle between "Pending" and "Approved"
        updateStatusMutation.mutate({ _id, status: newStatus });
    };

    if (!user) {
        return <p>Loading user information...</p>
    }

    if (isLoading && payments.length === 0) return <p>No Contact request yet!</p>;
    if (error) return <p>Error loading contact requests: {error.message}</p>;

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 text-center">
                My Contact Request
            </h2>

            <div className="overflow-x-auto">
                <table className="min-w-full border border-pink-300 shadow-lg">
                    <thead className="bg-pink-200 text-pink-900">
                        <tr>
                            <th className="border border-pink-300 px-4 py-2">Name</th>
                            <th className="border border-pink-300 px-4 py-2">Biodata ID</th>
                            <th className="border border-pink-300 px-4 py-2">Status</th>
                            <th className="border border-pink-300 px-4 py-2">Mobile</th>
                            <th className="border border-pink-300 px-4 py-2">Email</th>
                            <th className="border border-pink-300 px-4 py-2">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length > 0 ? (
                            payments.map((payment) => (
                                <tr key={payment.bioDataId} className="bg-pink-50 hover:bg-pink-100">
                                    <td className="border border-pink-300 px-4 py-2">
                                        {payment.name || "N/A"}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2">
                                        {payment.biodataId || "N/A"}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2">
                                        <button
                                            className={`px-3 py-1 rounded-md ${payment.status === "Approved" ? "bg-green-500" : "bg-yellow-500"
                                                } text-white`}
                                            onClick={() => handleStatusChange(payment._id, payment.status)}
                                        >
                                            {payment.status || "Pending"}
                                        </button>
                                    </td>
                                    {/* <td className="border border-pink-300 px-4 py-2">
                                        {payment.mobileNumber || "N/A"}
                                    </td> */}

                                    {/* <td className="border border-pink-300 px-4 py-2">
                                        {payment.status === "Approved"
                                            ? payment.mobileNumber
                                            : "Pending Approval"}
                                    </td> */}

                                    <td className="border border-pink-300 px-4 py-2">
                                        
                                        {payment.status?.toLowerCase() === 'approved' ? (
                                            payment.mobileNumber || <span className="text-gray-500">Not Available</span>
                                        ) : (
                                            <span className="text-gray-500">Pending Approval</span>
                                        )}
                                    </td>

                                    <td className="border border-pink-300 px-4 py-2">
                                        {payment.email || "N/A"}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2 text-center">
                                        <button
                                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-700"
                                            onClick={() => handleDelete(payment._id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="border border-pink-300 px-4 py-4 text-center text-gray-500"
                                >
                                    No Contact request yet!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ContactRequest;