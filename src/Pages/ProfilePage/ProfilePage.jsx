import { Card } from "flowbite-react";
import { useContext } from "react";
import userIcon from "../../assets/user.png";
import { AuthContext } from "../../Provider/AuthContext";

const ProfilePage = () => {

    const { user } = useContext(AuthContext);

    return (
        <section className="py-10 px-4 md:px-10">
            <h2 className="text-2xl text-center font-bold text-pink-700 mb-6">My Profile</h2>

            <Card className="max-w-2xl mx-auto shadow-lg border rounded-2xl">
                {/* User Image */}
                <div className="flex flex-col items-center">
                    <img
                        src={user?.photoURL || userIcon}
                        alt="User"
                        className="w-32 h-32 rounded-full border-4 border-pink-400 object-cover shadow-md"
                    />
                    <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">
                        {user?.displayName || "Unknown User"}
                    </h3>
                    <p className="text-gray-500">{user?.email}</p>
                </div>

                {/* User Details */}
                <div className="mt-6 space-y-3">
                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Name
                        </span>
                        <span>{user?.displayName || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Email
                        </span>
                        <span>{user?.email || "N/A"}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Phone Number
                        </span>
                        <span>{user?.phoneNumber || "+880XXXXXXXXXX"}</span>
                    </div>

                    <div className="flex justify-between border-b pb-2">
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Address
                        </span>
                        <span>{user?.address || "Not provided"}</span>
                    </div>
                </div>
            </Card>
        </section>
    );
};

export default ProfilePage;