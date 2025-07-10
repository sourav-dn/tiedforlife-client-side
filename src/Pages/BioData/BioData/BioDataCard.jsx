import { Card } from "flowbite-react";
import { Link } from "react-router";

const BioDataCard = ({data}) => {

    const {
        _id,
        id,
        fullName,
        gender,
        profilePicture,
        permanentDivision,
        age,
        occupation,
    } = data;

    return (
        <Card className="max-w-sm md:max-w-md lg:max-w-lg shadow-md border border-gray-200">
            <img
                src={profilePicture}
                alt="profile"
                // className="w-full h-44 rounded-lg object-cover"
                className="w-full h-32 sm:h-52 md:h-52 object-cover rounded-lg"
            />
            <div className="text-center md:text-left">
                <p className="text-lg font-bold text-gray-900 dark:text-gray-200">BioData ID: {id}</p>
                <p className="text-gray- dark:text-gray-300">
                    <span className="font-semibold">Name: </span> {fullName}
                </p>
                <p className="text-gray- dark:text-gray-300">
                    <span className="font-semibold">Gender: </span> {gender}
                </p>
                <p className="text-gray- dark:text-gray-300">
                    <span className="font-semibold">Division: </span> {permanentDivision}
                </p>
                <p className="text-gray- dark:text-gray-300">
                    <span className="font-semibold">Age: </span> {age}
                </p>
                <p className="text-gray- dark:text-gray-300">
                    <span className="font-semibold">Occupation:</span> {occupation}
                </p>
                <Link to={`/bioData/${_id}`}>
                    <button className="mt-4 bg-gradient-to-r from-pink-400 to-pink-500 text-white py-2 px-4 rounded-lg hover:bg-pink-600">
                        View Details
                    </button>
                </Link>
            </div>
        </Card>
    );
};

export default BioDataCard;