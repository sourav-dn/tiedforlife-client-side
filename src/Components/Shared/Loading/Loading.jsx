import { Spinner } from "flowbite-react";


const Loading = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-300 to-pink-300">
            <div className="flex flex-col items-center space-y-4 bg-white p-6 shadow-lg rounded-lg">
                <Spinner className="animate-spin" size="xl" color="pink" aria-label="Loading..." />
                <p className="text-lg font-semibold text-gray-700">
                    Loading, please wait...
                </p>
            </div>
        </div>
    );
};

export default Loading;