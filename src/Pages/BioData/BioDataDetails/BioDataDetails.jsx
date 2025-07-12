import { Card, Button } from "flowbite-react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import useInfo from "../../../hooks/useInfo";
import { useLoaderData, useNavigate, Link } from "react-router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { FaHeart, FaPhoneAlt } from "react-icons/fa";

const BioDataDetails = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const [, refetch] = useInfo();
    const navigate = useNavigate();

    // Destructure the CORRECT property names from your data
    const {
        _id,
        id: biodataId,
        gender,
        fullName,
        profilePicture,
        dateOfBirth,
        height,
        weight,
        age,
        occupation,
        race,
        fathersName,
        mothersName,
        permanentDivision,
        presentDivision,
        partnerPreferences,
        contactEmail,
        mobileNumber,
    } = useLoaderData();



    const [similarBiodata, setSimilarBiodata] = useState([]);

    // Fetch similar biodata based on gender
    useEffect(() => {
        const fetchSimilarBiodata = async () => {
            // Don't fetch if gender isn't loaded yet
            if (!gender) return;
            try {
                const response = await axiosSecure.get(`/bioData?biodataType=${gender}`);
                // Filter out the current profile from the similar list
                const filteredBiodata = response.data.filter(
                    (b) => b.biodataId !== biodataId
                );
                setSimilarBiodata(filteredBiodata.slice(0, 3)); // Get up to 3 similar profiles
            } catch (error) {
                console.error("Error fetching similar biodata:", error);
            }
        };
        fetchSimilarBiodata();
    }, [gender, biodataId, axiosSecure]);

    // Handle Add to Favorites button click
    const handleAddFavorite = () => {
        if (!user) {
            Swal.fire("Login Required", "Please log in to add favorites.", "warning");
            navigate('/login');
            return;
        }
        const favoriteData = {
            personId: _id, // Use the MongoDB _id to ensure uniqueness
            email: user.email,
            name: fullName,
            biodataId,
            permanentDivision,
            occupation,
        };
        axiosSecure.post("/favorite", favoriteData).then((res) => {
            if (res.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: `${fullName} has been added to your favorites.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                refetch();
            } else {
                Swal.fire("Already Added", res.data.message, "info");
            }
        });
    };

    // Handle Request Contact button click
    const handleReqContact = () => {
        const contactData = {
            fullName,
            biodataId,
            contactEmail,
            mobileNumber,
        };
        navigate(`/payment/${_id}`, {
            state: contactData,
        });

    };

    return (
        <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-orange-50 to-pink-100 p-6">
            <Card className="w-full max-w-3xl p-8 shadow-2xl rounded-2xl bg-white border border-pink-400">
                <div className="flex flex-col md:flex-row gap-8 items-center">
                    {/* Profile Section */}
                    <div className="w-full md:w-1/3 flex flex-col items-center">
                        <img
                            src={profilePicture}
                            alt="Profile"
                            className="w-40 h-40 object-cover rounded-full border-4 border-yellow-500 shadow-lg"
                        />
                        <h2 className="text-xl font-bold text-pink-600 mt-4">
                            BioData ID: {biodataId}
                        </h2>
                    </div>

                    {/* BioData Details Table */}
                    <div className="w-full md:w-2/3">
                        <h3 className="text-2xl font-semibold text-yellow-400 border-b pb-2">
                            Personal Details
                        </h3>
                        <table className="w-full mt-3 border-collapse">
                            <tbody>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Gender</td>
                                    <td className="text-gray-800 py-2">{gender}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Name</td>
                                    <td className="text-gray-800 py-2">{fullName}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Age</td>
                                    <td className="text-gray-800 py-2">{age} years</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Date Of Birth</td>
                                    <td className="text-gray-800 py-2">{dateOfBirth}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Occupation</td>
                                    <td className="text-gray-800 py-2">{occupation}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Height</td>
                                    <td className="text-gray-800 py-2">{height}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Weight</td>
                                    <td className="text-gray-800 py-2">{weight || "N/A"}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Race</td>
                                    <td className="text-gray-800 py-2">{race}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Father's Name</td>
                                    <td className="text-gray-800 py-2">{fathersName}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Mother's Name</td>
                                    <td className="text-gray-800 py-2">{mothersName}</td>
                                </tr>
                                <tr className="border-b">
                                    <td className="text-yellow-600 font-medium py-2">Permanent Division</td>
                                    <td className="text-gray-800 py-2">{permanentDivision}</td>
                                </tr>
                                <tr>
                                    <td className="text-yellow-600 font-medium py-2">Present Division</td>
                                    <td className="text-gray-800 py-2">{presentDivision}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Expected Partner Details */}
                <div className="mt-6 bg-purple-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-yellow-600 mb-3">
                        Expected Partner Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4 text-gray-700">
                        <p><strong className="text-pink-600">Age:</strong> {partnerPreferences?.ageRange || "N/A"}</p>
                        <p><strong className="text-pink-600">Height:</strong> {partnerPreferences?.heightRange || "N/A"}</p>
                        <p><strong className="text-pink-600">Weight:</strong> {partnerPreferences?.weightRange || "N/A"}</p>
                        <p><strong className="text-pink-600">Religion:</strong> {partnerPreferences?.religion || "N/A"}</p>
                    </div>
                </div>

                {/* Contact Info */}
                <div className="mt-6 bg-pink-50 p-6 rounded-lg shadow-md">
                    <h3 className="text-lg font-semibold text-yellow-600 mb-3">
                        Contact Information
                    </h3>
                    <p className="text-gray-700">
                        <strong className="text-pink-600">Email:</strong> "Request Contact
                        Information"
                    </p>
                    <p className="text-gray-700">
                        <strong className="text-pink-600">Mobile:</strong> "Request Contact
                        Information"
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
                    <Button onClick={handleAddFavorite} className="bg-pink-500 hover:bg-pink-700">
                        <FaHeart className="mr-2 h-5 w-5" /> Add to Favorites
                    </Button>
                    <Button onClick={handleReqContact} className="bg-yellow-400 hover:bg-yellow-700">
                        <FaPhoneAlt className="mr-2 h-5 w-5" /> Request Contact Information
                    </Button>
                </div>
            </Card>

            {/* Similar Biodata Section */}
            <div className="mt-8 w-full max-w-3xl">
                <h3 className="text-2xl font-semibold text-yellow-400 mb-4">Similar Biodata</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {similarBiodata.map((bio) => (
                        <Card key={bio._id} className="shadow-md">
                            <img src={bio.profilePicture} alt="Profile" className="h-40 w-full object-cover" />
                            <div className="p-4">
                                <h4 className="text-lg font-semibold">{bio.fullName}</h4>
                                <p className="text-gray-600">Age: {bio.age}</p>
                                <Link to={`/bioData/${bio._id}`}>
                                    <button className="mt-4 w-full bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 px-4 rounded-lg hover:from-pink-500 hover:to-pink-600">
                                        View Profile
                                    </button>
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default BioDataDetails;