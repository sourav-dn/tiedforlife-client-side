import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";
import useAxiosBio from "../../../hooks/useAxiosBio";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { TextInput, Label, Button, Select } from "flowbite-react";


const EditBioData = ({ biodataId }) => {

    const { user, loading } = useAuth();
    const { getBiodata } = useAxiosBio();
    const navigate = useNavigate();
    const [biodata, setBiodata] = useState({
        biodataId: "",
        gender: "",
        name: "",
        profilePicture: "",
        dateOfBirth: "",
        height: "",
        weight: "",
        age: "",
        occupation: "",
        race: "",
        fatherName: "",
        motherName: "",
        permanentDivision: "",
        presentDivision: "",
        expectedPartnerAge: "",
        expectedPartnerHeight: "",
        expectedPartnerWeight: "",
        email: "",
        mobile: "",
    });

    useEffect(() => {
        if (biodataId) {
            getBiodata(biodataId)
                .then((data) => setBiodata(data))
                .catch((err) => console.error(err));
        }
    }, [biodataId, getBiodata]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBiodata({
            ...biodata,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);
        // console.log(...formData.entries());

        const initialData = Object.fromEntries(formData.entries());
        // console.log(initialData);

        const weight = parseInt(initialData.weight) || 0;
        const age = parseInt(initialData.age) || 0;
        const expectedPartnerAge = parseInt(initialData.expectedPartnerAge) || 0;
        const expectedPartnerWeight =
            parseInt(initialData.expectedPartnerWeight) || 0;

        const updatedBiodata = {
            ...initialData,
            biodataId,
            weight,
            age,
            expectedPartnerAge,
            expectedPartnerWeight,
        };

        fetch("http://localhost:3000/bioData", {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },

            body: JSON.stringify(updatedBiodata),
        })
            .then((res) => res.json())
            .then((data) => {
                // console.log("Server Response:", data);

                if (
                    data.insertedId ||
                    data.message === "Biodata created successfully" ||
                    data.message === "Biodata updated successfully"
                ) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Your BioData has been saved successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });
                    navigate("/dashboard/viewBio");
                }
            });
    };

        // This prevents rendering the form until authentication is confirmed
    if (loading) {
        return <p className="text-center my-10">Loading...</p>;
    }
    
    // FIX 3: Prevent rendering if the user is not logged in
    if (!user) {
        return <p className="text-center my-10">Please log in to edit your biodata.</p>;
    }

    return (
        <div className="container mx-auto mt-10 p-5 shadow-lg rounded-lg">
            <h2 className="text-3xl font-bold text-center mb-6 text-pink-600">
                Build Your Matrimonial Profile
            </h2>
            <form
                onSubmit={handleSubmit}
                className="grid sm:grid-cols-1 md:grid-cols-2 gap-6 p-8 border-2 rounded-lg shadow-lg bg-[#faf6fa]"
            >
                {/* Name */}
                <div>
                    <p className="font-bold text-sm">Name</p>
                    <TextInput
                        id="name"
                        name="name"
                        value={biodata.name}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Enter your name"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Gender */}
                <div>
                    <p className="font-bold text-sm">Gender</p>
                    <Select
                        id="gender"
                        name="gender"
                        value={biodata.gender}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </Select>
                </div>

                {/* Profile Image */}
                <div>
                    <p className="font-bold text-sm">Profile Image URL</p>
                    <TextInput
                        id="profilePicture"
                        name="profilePicture"
                        value={biodata.profilePicture}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Enter profile image URL"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Date of Birth */}
                <div>
                    <p className="font-bold text-sm">Date of Birth</p>
                    <TextInput
                        id="dateOfBirth"
                        name="dateOfBirth"
                        type="date"
                        value={biodata.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Your Age */}
                <div>
                    <p className="font-bold text-sm">Your Age</p>
                    <TextInput
                        id="age"
                        name="age"
                        value={biodata.age}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter your age"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Height */}
                <div>
                    <p className="font-bold text-sm">Height</p>
                    <Select
                        id="height"
                        name="height"
                        value={biodata.height}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Height</option>
                        <option value="150cm">150 cm</option>
                        <option value="160cm">160 cm</option>
                        <option value="170cm">170 cm</option>
                        <option value="180cm">180 cm</option>
                    </Select>
                </div>

                {/* Weight */}
                <div>
                    <p className="font-bold text-sm">Weight</p>
                    <Select
                        id="weight"
                        name="weight"
                        value={biodata.weight}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Weight</option>
                        <option value="50kg">50 kg</option>
                        <option value="60kg">60 kg</option>
                        <option value="70kg">70 kg</option>
                        <option value="80kg">80 kg</option>
                    </Select>
                </div>

                {/* Occupation */}
                <div>
                    <p className="font-bold text-sm">Occupation</p>
                    <Select
                        id="occupation"
                        name="occupation"
                        value={biodata.occupation}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Occupation</option>
                        <option value="Student">Student</option>
                        <option value="Engineer">Engineer</option>
                        <option value="Teacher">Teacher</option>
                        <option value="Doctor">Doctor</option>
                    </Select>
                </div>

                {/* Race */}
                <div>
                    <p className="font-bold text-sm">Race (Skin Color)</p>
                    <Select
                        id="race"
                        name="race"
                        value={biodata.race}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Race</option>
                        <option value="Fair">Fair</option>
                        <option value="Medium">Medium</option>
                        <option value="Dark">Dark</option>
                    </Select>
                </div>

                {/* Permanent Division */}
                <div>
                    <p className="font-bold text-sm">Permanent Division</p>
                    <Select
                        id="permanentDivision"
                        name="permanentDivision"
                        value={biodata.permanentDivision}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagram">Chattagram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </Select>
                </div>

                {/* Present Division */}
                <div>
                    <p className="font-bold text-sm">Present Division</p>
                    <Select
                        id="presentDivision"
                        name="presentDivision"
                        value={biodata.presentDivision}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Division</option>
                        <option value="Dhaka">Dhaka</option>
                        <option value="Chattagram">Chattagram</option>
                        <option value="Rangpur">Rangpur</option>
                        <option value="Barisal">Barisal</option>
                        <option value="Khulna">Khulna</option>
                        <option value="Mymensingh">Mymensingh</option>
                        <option value="Sylhet">Sylhet</option>
                    </Select>
                </div>

                {/* Father Name */}
                <div>
                    <p className="font-bold text-sm">Father Name</p>
                    <TextInput
                        id="fatherName"
                        name="fatherName"
                        value={biodata.fatherName}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Enter your father name"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Mother Name */}
                <div>
                    <p className="font-bold text-sm">Mother Name</p>
                    <TextInput
                        id="motherName"
                        name="motherName"
                        value={biodata.motherName}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Enter your mother name"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Expected Partner Age */}
                <div>
                    <p className="font-bold text-sm">Expected Partner Age</p>
                    <TextInput
                        id="expectedPartnerAge"
                        name="expectedPartnerAge"
                        value={biodata.expectedPartnerAge}
                        onChange={handleChange}
                        type="number"
                        placeholder="Enter expected partner's age"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Expected Partner Height */}
                <div>
                    <p className="font-bold text-sm">Expected Partner Height</p>
                    <Select
                        id="expectedPartnerHeight"
                        name="expectedPartnerHeight"
                        value={biodata.expectedPartnerHeight}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Expected Partner Height</option>
                        <option value="150cm">150 cm</option>
                        <option value="160cm">160 cm</option>
                        <option value="170cm">170 cm</option>
                        <option value="180cm">180 cm</option>
                    </Select>
                </div>

                {/* Expected Partner Weight */}
                <div>
                    <p className="font-bold text-sm">Expected Partner Weight</p>
                    <Select
                        id="expectedPartnerWeight"
                        name="expectedPartnerWeight"
                        value={biodata.expectedPartnerWeight}
                        onChange={handleChange}
                        required
                        className="border-2 border-pink-300 rounded-lg p-2"
                    >
                        <option value="">Select Expected Partner Weight</option>
                        <option value="50kg">50 kg</option>
                        <option value="60kg">60 kg</option>
                        <option value="70kg">70 kg</option>
                        <option value="80kg">80 kg</option>
                    </Select>
                </div>

                {/* Email */}
                <div>
                    <p className="font-bold text-sm">Email</p>
                    <TextInput
                        id="email"
                        name="email"
                        value={user.email || ""}
                        onChange={handleChange}
                        required
                        type="email"
                        placeholder="Enter your email"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                        readOnly
                    />
                </div>

                {/* Mobile */}
                <div>
                    <p className="font-bold text-sm">Mobile</p>
                    <TextInput
                        id="mobile"
                        name="mobile"
                        value={biodata.mobile}
                        onChange={handleChange}
                        required
                        type="text"
                        placeholder="Enter your mobile number"
                        className="border-2 border-pink-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-300 p-2"
                    />
                </div>

                {/* Submit Button */}
                <div className="col-span-2">
                    <Button
                        type="submit"
                        color="pink"
                        className="w-full bg-pink-300 hover:bg-pink-300"
                    >
                        Save & Publish Now
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default EditBioData;