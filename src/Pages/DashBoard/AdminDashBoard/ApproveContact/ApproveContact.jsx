import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";


const ApproveContact = () => {

    const axiosSecure = useAxiosSecure();
    const queryClient = useQueryClient();

    // Fetch users who have made payments
    const {
        data: paymentData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ["paymentData"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin/payments");
            // console.log("Payment Data:", res.data);
            return res.data;
        },
        onError: (error) => {
            console.error("Error fetching payment data:", error);
        },
    });

    // Handle mutation for deleting payment data
    const deletePaymentMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.delete(`/payments/${id}`);
        },
        onSuccess: () => {
            Swal.fire("Deleted!", "Payment record has been deleted.", "success");
            queryClient.invalidateQueries(["paymentData"]);
        },
        onError: (error) => {
            console.error("Error deleting payment data:", error);
        },
    });

    // Mutation for updating the payment status
    const updatePaymentStatusMutation = useMutation({
        mutationFn: async (id) => {
            await axiosSecure.patch(`/payment-data/${id}`, { status: "Approved" });
        },
        onSuccess: () => {
            Swal.fire("Success!", "Payment status updated to Approved.", "success");
            queryClient.invalidateQueries(["paymentData"]);
        },
        onError: (error) => {
            console.error("Error updating payment status:", error);
        },
    });

    return (
        <div className="container mx-auto p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 text-center">
                Payment Data of Users
            </h2>

            {/* **Payment Data Table** */}
            <div className="overflow-x-auto">
                <table className="min-w-full border border-pink-300 shadow-lg">
                    <thead className="bg-pink-200 text-pink-900">
                        <tr>
                            <th className="border border-pink-300 px-4 py-2">#</th>
                            <th className="border border-pink-300 px-4 py-2">Name</th>
                            <th className="border border-pink-300 px-4 py-2">Email</th>
                            <th className="border border-pink-300 px-4 py-2">
                                Amount Paid
                            </th>
                            <th className="border border-pink-300 px-4 py-2">Status</th>
                            <th className="border border-pink-300 px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-xl font-semibold text-pink-600"
                                >
                                    Loading...
                                </td>
                            </tr>
                        ) : isError ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-xl font-semibold text-pink-600"
                                >
                                    {error.message}
                                </td>
                            </tr>
                        ) : paymentData.length === 0 ? (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="text-center py-4 text-xl font-semibold text-pink-600"
                                >
                                    No payment data available
                                </td>
                            </tr>
                        ) : (
                            paymentData.map((payment, index) => (
                                <tr key={payment._id} className="border-b hover:bg-gray-100">
                                    <td className="border px-4 py-2">{index + 1}</td>
                                    <td className="border px-4 py-2">{payment.name}</td>
                                    <td className="border px-4 py-2">{payment.email}</td>
                                    <td className="border px-4 py-2">{payment.price}</td>
                                    <td className="border px-4 py-2">
                                        {/* Status button */}
                                        <button
                                            className={`${payment.status === "Approved"
                                                    ? "bg-green-500"
                                                    : "bg-yellow-500"
                                                } text-white py-1 px-4 rounded`}
                                            onClick={() =>
                                                updatePaymentStatusMutation.mutate(payment._id)
                                            }
                                            disabled={payment.status === "Approved"} // Disable the button if already approved
                                        >
                                            {payment.status === "Approved" ? "Approved" : "Approve"}
                                        </button>
                                    </td>
                                    <td className="border px-4 py-2 text-center">
                                        <FaTrashAlt
                                            className="text-red-600 cursor-pointer"
                                            onClick={() => {
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
                                                        deletePaymentMutation.mutate(payment._id);
                                                    }
                                                });
                                            }}
                                        />
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

export default ApproveContact;