import { useState, useEffect } from "react";
import { Button, Sidebar } from "flowbite-react";
import Cover from "../../../Components/Shared/Cover/Cover.jsx";
import coverImg from "../../../assets/Cover/cover1.jpg";
import useAxiosSecure from "../../../hooks/useAxiosSecure.jsx";
import { useLoaderData } from "react-router";
import BioDataCard from "../BioData/BioDataCard.jsx";

const BioData = () => {
    const [minAge, setMinAge] = useState("");
    const [maxAge, setMaxAge] = useState("");
    const [gender, setGender] = useState("");
    const [division, setDivision] = useState("");
    const [bioData, setBioData] = useState([]); // bioData state directly managed here
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const axiosSecure = useAxiosSecure();

    // Function to fetch biodata based on current filter states (can be reused)
    const fetchBioDataWithFilters = async (
        ageMin,
        ageMax,
        bioType,
        permDivision
        // Pagination parameters (page, limit) would be added here if backend handles it
    ) => {
        try {
            const res = await axiosSecure.get(
                // Construct URL with parameters. Empty strings will be sent for unfilled fields,
                // which the backend is designed to ignore due to its 'if (param)' checks.
                `/bioData?minAge=${ageMin || ''}&maxAge=${ageMax || ''}&biodataType=${bioType || ''}&permanentDivision=${permDivision || ''}`,
                {
                    withCredentials: true,
                }
            );
            setBioData(res?.data);
        } catch (error) {
            console.error("Error fetching bioData:", error);
        }
    };

    // Initial fetch of all biodata when the component mounts.
    // This will result in an initial 'Query: {}' on the backend, which is expected for an unfiltered load.
    useEffect(() => {
        fetchBioDataWithFilters(minAge, maxAge, gender, division); // Initial call with empty filter states
    }, [axiosSecure]); // Dependency on axiosSecure to avoid lint warnings; effectively runs once on mount

    // Handler for filter form submission
    const handleFilter = (e) => {
        e.preventDefault();
        // Trigger a fetch with the current state values
        fetchBioDataWithFilters(minAge, maxAge, gender, division);
        setCurrentPage(0); // Reset to first page after applying new filters
    };

    // Pagination logic (assuming count is loaded correctly via useLoaderData)
    const { count } = useLoaderData();

    // FIX: Ensure count is a valid number to prevent "Invalid array length" error.
    const safeCount = typeof count === 'number' && count >= 0 ? count : 0;

    const numberOfPages = Math.ceil(safeCount / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()]; // Creates an array [0, 1, ..., numberOfPages-1]

    const handleItemsPerPage = (e) => {
        const val = parseInt(e.target.value);
        setItemsPerPage(val);
        setCurrentPage(0); // Reset to first page
        // If your backend handles pagination (sending only `limit` items),
        // you would need to re-fetch data here:
        // fetchBioDataWithFilters(minAge, maxAge, gender, division, 0, val);
    };

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        // Correct condition: Ensure not to go beyond the last page index
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <div>
            <Cover img={coverImg} title="Your Bio-Data, Your Identity" />

            <div className="flex flex-col lg:flex-row min-h-screen my-10 gap-10">
                {/* Sidebar for Filters */}
                <Sidebar
                    aria-label="Bio Data Sidebar"
                    className="w-96 h-auto p-6 mx-auto rounded-lg"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200">Filters</h2>
                    <form onSubmit={handleFilter} className="space-y-6">
                        <div className="md:flex gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Min Age
                                </label>
                                <input
                                    onChange={(e) => setMinAge(e.target.value)}
                                    type="number"
                                    className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Min Age"
                                    value={minAge} 
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                    Max Age
                                </label>
                                <input
                                    onChange={(e) => setMaxAge(e.target.value)}
                                    type="number"
                                    className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                    placeholder="Max Age"
                                    value={maxAge} 
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Gender
                            </label>
                            <select
                                onChange={(e) => setGender(e.target.value)}
                                className="mt-2 p-3 w-full border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={gender} 
                            >
                                <option value="">Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                                Division
                            </label>
                            <select
                                onChange={(e) => setDivision(e.target.value)}
                                className="mt-2 p-3 w-full dark:text-gray-700 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                                value={division} 
                            >
                                <option value="">Select Division</option>
                                <option value="Dhaka">Dhaka</option>
                                <option value="Chittagong">Chittagong</option>
                                <option value="Rangpur">Rangpur</option>
                                <option value="Barisal">Barisal</option>
                                <option value="Khulna">Khulna</option>
                                <option value="Mymensingh">Mymensingh</option>
                                <option value="Sylhet">Sylhet</option>
                            </select>
                        </div>
                        <button
                            type="submit"
                            className="w-full border-2 border-pink-500 text-pink-600 font-bold p-3 rounded-md shadow-md transition-all hover:opacity-90"
                        >
                            Find
                        </button>
                    </form>
                </Sidebar>

                {/* Main Content Area */}
                <div className="flex-1 p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-semibold mb-8 text-pink-600">
                        All Bio Datas
                    </h1>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                        {/* Conditional rendering based on bioData content */}
                        {Array.isArray(bioData) && bioData.length > 0 ? (
                            bioData
                                .slice(
                                    currentPage * itemsPerPage,
                                    (currentPage + 1) * itemsPerPage
                                )
                                .map((data) => (
                                    <BioDataCard key={data._id} data={data} />
                                ))
                        ) : (
                            // Message shown when no biodata is found after filters/initial load
                            <p className="text-gray-500">No biodata found matching your criteria.</p>
                        )}
                    </div>
                </div>
            </div>

            {/* Pagination Controls */}
            <div className="text-center mb-10">
                {/* Display current page (1-indexed) and total pages */}
                <p className="py-3">Current Page: {currentPage + 1} of {numberOfPages || 1}</p>

                <div className="flex justify-center items-center gap-4">
                    <div className="flex gap-2">
                        {/* Previous Page Button */}
                        <Button onClick={handlePrevPage} disabled={currentPage === 0}>prev</Button>
                        {/* Page Number Buttons */}
                        {pages.map((page) => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`px-3 py-1 border rounded ${currentPage === page
                                        ? "bg-pink-500 text-white "
                                        : "bg-gray-200 dark:text-gray-700"
                                    }`}
                            >
                                {page + 1} {/* Display page numbers starting from 1 */}
                            </button>
                        ))}
                        {/* Next Page Button */}
                        <Button onClick={handleNextPage} disabled={currentPage === pages.length - 1 || numberOfPages === 0}>Next</Button>
                    </div>

                    {/* Items Per Page Dropdown */}
                    <select
                        value={itemsPerPage}
                        onChange={handleItemsPerPage}
                        className="border rounded px-2 py-1 dark:text-gray-700"
                    >
                        <option value="10">10</option>
                        <option value="20">20</option>
                        <option value="30">30</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default BioData;