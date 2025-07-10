import { useEffect, useState } from "react";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { Table } from "flowbite-react";


const SuccessStories = () => {

    const [successStories, setSuccessStories] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        const fetchSuccessStories = async () => {
            try {
                const response = await axiosSecure.get("/successReview");
                setSuccessStories(response.data);
            } catch (error) {
                console.error("Error fetching success stories:", error);
            }
        };

        fetchSuccessStories();
    }, []);

    const viewStory = (id) => {
        window.location.href = `/successReview/${id}`;
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl sm:text-3xl font-bold text-pink-600 mb-4 text-center">
                Success Stories
            </h2>

            <div className="overflow-x-auto">
                <Table className="min-w-full border border-pink-300 shadow-lg">
                    <thead className="bg-pink-200 text-pink-900">
                        <tr>
                            <th className="border border-pink-300 px-4 py-2">
                                Male Biodata ID
                            </th>
                            <th className="border border-pink-300 px-4 py-2">
                                Female Biodata ID
                            </th>
                            <th className="border border-pink-300 text-center">
                                View Story
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-100">
                        {successStories.length > 0 ? (
                            successStories.map((story) => (
                                <tr key={story._id} className="bg-pink-50 hover:bg-pink-100">
                                    <td className="border border-pink-300 px-4 py-2 font-medium text-gray-800">
                                        {story.selfBiodataId || "N/A"}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2 font-medium text-gray-800">
                                        {story.partnerBiodataId || "N/A"}
                                    </td>
                                    <td className="border border-pink-300 px-4 py-2 text-center">
                                        <button
                                            onClick={() => viewStory(story._id)}
                                            className="bg-pink-400 hover:bg-pink-600 text-white font-medium px-4 py-2 rounded-md shadow-md transition-all"
                                        >
                                            View Story
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan="3"
                                    className="border border-pink-300 px-4 py-4 text-center text-gray-500"
                                >
                                    No success stories available.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        </div>
    );
};

export default SuccessStories;