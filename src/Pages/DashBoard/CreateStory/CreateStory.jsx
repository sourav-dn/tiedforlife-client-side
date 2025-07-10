import { TextInput, Textarea, Button, Label, FileInput } from "flowbite-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import SectionTitle from "../../../Components/SectionTitle";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { GoChecklist } from "react-icons/go";

const CreateStory = () => {

    const { register, handleSubmit, reset } = useForm();
    const [loading, setLoading] = useState(false);
    const [marriageDate, setMarriageDate] = useState(null);

    const onSubmit = async (data) => {
        if (!data.image[0]) {
            toast.error("Please upload a couple image.");
            return;
        }

        setLoading(true);

        try {
            // Upload Image to Cloudinary
            const imageData = new FormData();
            imageData.append("image", data.image[0]);
            // imageData.append(
            //     "upload_preset",
            //     import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
            // );
            // imageData.append(
            //     "cloud_name",
            //     import.meta.env.VITE_CLOUDINARY_CLOUD_NAME
            // );

            const res = await fetch(
                `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
                {
                    method: "POST",
                    body: imageData,
                }
            );
            // if (!res.ok) {
            //     const error = await res.text(); // Get the error response
            //     console.error("Error uploading image:", error);
            //     throw new Error("Image upload failed! " + error);
            // }

            if (!res.ok) {
                throw new Error("ImgBB image upload failed!");
            }

            const uploadRes = await res.json();
            
            // Check if the upload was successful and get the URL
            if (!uploadRes.success) {
                throw new Error("ImgBB returned an error: " + uploadRes.error.message);
            }
            const imageUrl = uploadRes.data.url;

            // const uploadRes = await res.json();
            // if (!uploadRes || !uploadRes.url) {
            //     console.error("Upload response:", uploadRes);
            //     throw new Error("Image upload failed!");
            // }

            // Send Story Data to Server
            const createStory = {
                selfBiodataId: parseInt(data.selfBiodataId, 10),
                partnerBiodataId: parseInt(data.partnerBiodataId, 10),
                brideName: data.brideName,
                groomName: data.groomName,
                reviewStar: parseInt(data.reviewStar, 10),
                marriageDate: marriageDate
                    ? marriageDate.toISOString().split("T")[0]
                    : null,
                successStory: data.successStory,
                // image: uploadRes.url,
                image: imageUrl,
            };
            // console.log("Submitting story:", createStory);

            const response = await fetch("http://localhost:3000/successReview", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(createStory),
            });

            const result = await response.json();

            if (result?.insertedId) {
                reset();
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your story has been submitted successfully!",
                    showConfirmButton: false,
                    timer: 1500,
                });
            } else {
                throw new Error("Story submission failed!");
            }
        } catch (error) {
            console.error(error);
            toast.error("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-3xl mx-auto p-8 bg-white shadow-xl rounded-2xl border border-gray-200 lg:my-20">
            {/* <h2 className="text-3xl font-bold text-center text-pink-600 mb-6">
          Got Married? Share Your Story!
        </h2> */}
            <SectionTitle heading="Got Married" subHeading="Create Success Story" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Biodata Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-bold text-sm">Your Biodata ID</p>
                        <TextInput
                            name="selfBiodataId"
                            placeholder="Enter Your Biodata ID"
                            {...register("selfBiodataId", { required: true })}
                            className="rounded-xl border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <p className="font-bold text-sm">Partner's Biodata ID</p>
                        <TextInput
                            name="partnerBiodataId"
                            placeholder="Enter Partner's Biodata ID"
                            {...register("partnerBiodataId", { required: true })}
                            className="rounded-xl border-gray-300"
                            required
                        />
                    </div>
                </div>
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-bold text-sm">Bride Name</p>
                        <TextInput
                            id="brideName"
                            name="brideName"
                            placeholder="Enter Your Name"
                            {...register("brideName", { required: true })}
                            className="w-full rounded-xl border-gray-300"
                            required
                        />
                    </div>
                    <div>
                        <p className="font-bold text-sm">Groom Name</p>
                        <TextInput
                            id="groomName"
                            name="groomName"
                            placeholder="Enter Partner's Name"
                            {...register("groomName", { required: true })}
                            className="w-full rounded-xl border-gray-300"
                            required
                        />
                    </div>
                </div>

                {/* Review Star & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <p className="font-bold text-sm">Give Review Star (1-5)</p>
                        <TextInput
                            type="number"
                            name="reviewStar"
                            placeholder="Rate from 1-5"
                            min="1"
                            max="5"
                            {...register("reviewStar", { required: true })}
                            className="rounded-xl border-gray-300"
                            required
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <p className="font-bold text-sm">Marriage Date</p>
                        <DatePicker
                            id="marriageDate"
                            selected={marriageDate}
                            onChange={(date) => setMarriageDate(date)}
                            className="w-full p-2 border border-gray-300 rounded-xl bg-gray-50"
                            required
                        />
                    </div>
                </div>

                {/* Image Upload */}
                <div>
                    <p className="font-bold text-sm">Upload Couple Image</p>
                    <FileInput
                        id="file-upload"
                        accept="image/*"
                        {...register("image", { required: true })}
                        className="rounded-xl border-gray-300"
                        required
                    />
                </div>

                {/* Success Story */}
                <div>
                    <p className="font-bold text-sm">Share Your Experience</p>
                    <Textarea
                        name="successStory"
                        placeholder="Tell us about your journey..."
                        {...register("successStory", { required: true })}
                        className="rounded-xl border-gray-300 h-40"
                        required
                    />
                </div>

                {/* Submit Button */}
                <Button
                    type="submit"
                    color="pink"
                    className="w-full bg-pink-400 text-white font-bold py-2 rounded-xl hover:bg-pink-600 transition duration-200"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit Story"}{" "}
                    <GoChecklist className="ml-2" />
                </Button>
            </form>
        </div>
    );
};

export default CreateStory;