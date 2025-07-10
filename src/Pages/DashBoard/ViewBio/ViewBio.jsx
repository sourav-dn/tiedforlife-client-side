import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { Button, Card, Modal } from "flowbite-react";

const ViewBio = ({ biodata: initialBiodata }) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isPremiumRequestSent, setIsPremiumRequestSent] = useState(false);
    const [biodata, setBiodata] = useState(initialBiodata || null);
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchBiodata = async () => {
            try {
                const response = await axiosSecure.get(`/bioData?email=${user.email}`);
                if (response.data.length > 0) {
                    setBiodata(response.data[0]);
                }
            } catch (error) {
                console.error("Error fetching biodata:", error);
            }
        };

        if (user?.email && !initialBiodata) {
            fetchBiodata();
        }
    }, [user, axiosSecure, initialBiodata]);

    //Request For Premium
    const handlePremiumRequest = async () => {
        try {
            // Send request to admin for approval
            const response = await axiosSecure.post("/premiumRequest", {
                biodataId: biodata?.biodataId,
                name: biodata?.name,
                email: user.email,
            });

            //new refetch for premium
            const updatedResponse = await axiosSecure.get(
                `/bioData?email=${user.email}`
            );
            if (updatedResponse.data.length > 0) {
                setBiodata(updatedResponse.data[0]);
            }

            if (response.status === 200) {
                setIsPremiumRequestSent(true);
                setIsModalOpen(false);
                Swal.fire({
                    icon: "success",
                    title: "Request sent for admin approval!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            }
        } catch (error) {
            console.error("Error sending premium request:", error);
            alert("You have already sent a request for admin approval!");
        }
    };

    // This prevents rendering the form until authentication is confirmed
    if (loading) {
        return <p className="text-center my-10">Loading...</p>;
    }

    // FIX 3: Prevent rendering if the user is not logged in
    if (!user) {
        return <p className="text-center my-10">Please log in to view your biodata.</p>;
    }


    return (
        <div className="container mx-auto mt-10 my-10">
            {biodata ? (
                <Card className="p-8 rounded-xl border-b-4 border-pink-600 shadow-2xl bg-white">
                    <h1 className="text-3xl font-semibold text-center text-pink-700 rounded-lg py-2">
                        Your Premium Biodata
                    </h1>

                    {/* Biodata Information */}
                    <div className="flex justify-center mb-3">
                        <img
                            src={biodata?.profileImage || "/default-profile.png"}
                            alt="Profile"
                            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                        />
                    </div>

                    {biodata ? (
                        <div className="text-center mb-6 bg-pink-200 rounded-lg py-5">
                            <h2 className="text-xl font-medium text-gray-600">
                                Your Existing Biodata
                            </h2>
                            <p className="font-semibold text-pink-800">{biodata?.name}</p>
                        </div>
                    ) : (
                        <div className="bg-pink-100 border-l-4 border-pink-600 text-pink-600 p-4 mb-4">
                            <strong>No Biodata Found</strong>
                        </div>
                    )}
                    {/* Main Content Divided into Two Parts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                        <div className="border-r-4 border-pink-500 pr-6">
                            {/* Left Section with More Information */}
                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Name</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.name}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Gender</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.gender}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Date of Birth</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.dob}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Height</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.height}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Weight</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.weight}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Age</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.age}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Occupation</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.occupation}</p>
                            </div>
                        </div>

                        <div>
                            {/* Right Section with Remaining Information */}
                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Race</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.race}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Father's Name</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.fatherName}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Mother's Name</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.motherName}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">
                                    Permanent Division
                                </h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.permanentDivision}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">
                                    Present Division
                                </h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.presentDivision}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">
                                    Expected Partner's Age
                                </h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.expectedPartnerAge}</p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">
                                    Expected Partner's Height
                                </h4>
                                <p className="text-gray-700 dark:text-white">
                                    {biodata?.expectedPartnerHeight}
                                </p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">
                                    Expected Partner's Weight
                                </h4>
                                <p className="text-gray-700 dark:text-white">
                                    {biodata?.expectedPartnerWeight}
                                </p>
                            </div>

                            <div className="border-b border-gray-300 pb-4 mb-4">
                                <h4 className="font-semibold text-pink-500">Email</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.email || ""}</p>
                            </div>

                            <div>
                                <h4 className="font-semibold text-pink-500">Mobile</h4>
                                <p className="text-gray-700 dark:text-white">{biodata?.mobile}</p>
                            </div>
                        </div>
                    </div>

                    {/* Premium Button */}
                    {biodata?.isPremium ? (
                        <span className="text-green-500 font-semibold">Premium Member</span>
                    ) : (
                        <button
                            onClick={() => {
                                if (!isPremiumRequestSent) {
                                    setIsPremiumRequestSent(true);
                                    setIsModalOpen(true);
                                }
                            }}
                            disabled={isPremiumRequestSent}
                            className={`mt-3 px-4 py-2 rounded-lg text-white ${isPremiumRequestSent
                                ? "bg-gray-400 cursor-not-allowed"
                                : "bg-pink-500"
                                }`}
                        >
                            {isPremiumRequestSent ? "Request Sent" : "Request Premium"}
                        </button>
                    )}

                    {/* Modal Component */}
                    <Modal show={isModalOpen} onClose={() => setIsModalOpen(false)}>
                        <Modal.Header>Request Premium</Modal.Header>
                        <Modal.Body>
                            <p>Are you sure you want to request a premium membership?</p>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={handlePremiumRequest}>Yes, Request</Button>
                            <Button color="gray" onClick={() => setIsModalOpen(false)}>
                                Cancel
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </Card>
            ) : (
                <div className="text-center text-xl font-semibold text-gray-700">
                    Please add your biodata.
                </div>
            )}
        </div>
    );
};

export default ViewBio;