import { Rating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';
import { useLoaderData } from "react-router";


const SuccessStoryDetails = () => {

    const {
        selfBiodataId,
        partnerBiodataId,
        image,
        reviewStar,
        marriageDate,
        successStory,
        brideName,
        groomName,
        extraStory,
    } = useLoaderData();

    return (
        <div
            className="min-h-screen flex items-center justify-center bg-gradient-to-r from-pink-100 to-purple-100 p-10"

        >
            <div className="bg-white shadow-2xl rounded-3xl p-10 max-w-2xl text-center backdrop-blur-lg bg-opacity-90 border border-pink-300 relative overflow-hidden">
                {/* Glowing effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 opacity-10 blur-2xl animate-glow"></div>

                {/* Ribbon with Glow Effect */}
                <div className="absolute top-[5px] left-1/2 transform -translate-x-1/2 bg-pink-500 text-white text-xs font-bold px-4 py-1 rounded-full shadow-md z-10 drop-shadow-[0_0_8px_rgba(255,105,180,0.8)]">
                    Success Story
                </div>

                {/* Couple Image */}
                <div className="relative z-10">
                    <img
                        src={image}
                        alt="Success Couple"
                        className="w-56 h-52 rounded-xl mx-auto border-4 border-pink-600 shadow-xl transform hover:scale-105 transition-all duration-300 hover:shadow-2xl"
                    />
                </div>

                {/* Couple Names */}
                <h2 className="text-2xl font-semibold text-gray-800 mt-4">
                    {brideName} & {groomName}
                </h2>

                {/* Couple Names */}
                <h2 className="text-md text-gray-800 mt-4">
                    {partnerBiodataId} & {selfBiodataId}
                </h2>

                {/* Marriage Date */}
                <h2 className="text-2xl font-extrabold mt-6 relative z-10">
                    Married on: <span className="text-pink-700">{marriageDate}</span>
                </h2>

                {/* Rating */}
                <div className="flex justify-center my-6 relative z-10">
                    <Rating
                        style={{ maxWidth: 180 }}
                        value={reviewStar}
                        readOnly
                    />
                </div>

                {/* Success Story */}
                <p className="text-gray-800 italic text-lg leading-relaxed border-l-4 border-pink-500 pl-4 relative z-10 transform hover:translate-x-2 transition-all duration-300">
                    “{successStory}”
                </p>

                {/* Decorative Elements */}
                <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-pink-100 to-transparent z-0"></div>
                <div className="absolute top-0 right-0 w-16 h-full bg-gradient-to-l from-purple-100 to-transparent z-0"></div>

                {/* Extra Story Section */}
                {extraStory && (
                    <div className="mt-6 p-4 bg-pink-50 border-l-4 border-pink-400 rounded-md shadow-md">
                        <h3 className="text-lg font-semibold text-pink-600">
                            More About {brideName} & {groomName}
                        </h3>
                        <p className="text-gray-700 mt-2">{extraStory}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SuccessStoryDetails;