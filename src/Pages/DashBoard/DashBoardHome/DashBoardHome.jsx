import dashBoardLottie from "../../../assets/lottie/DashBoard2.json";
import DashImg from "../../../assets/Cover/dashboard1.jpg";
import useAuth from "../../../hooks/useAuth";
import { Card } from "flowbite-react";
import { Legend, LineChart, Line, PieChart, Pie, Cell,  XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import Lottie from "lottie-react";
import {
  CurrencyDollarIcon,
  TrophyIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/solid";

const data = [
    { name: "Jan", value: 400 },
    { name: "Feb", value: 300 },
    { name: "Mar", value: 500 },
    { name: "Apr", value: 700 },
];

const pieData = [
    { name: "New Matches", value: 400 },
    { name: "Messages", value: 300 },
    { name: "Profile Views", value: 300 },
    { name: "Premium Users", value: 200 },
];

const COLORS = ["#4F46E5", "#9333EA", "#F59E0B", "#EF4444"];

const DashBoardHome = () => {

    const { user } = useAuth();

    return (
        <div className="container mx-auto px-8 py-12 bg-gradient-to-r from-[#f9f5f6] to-[#f6f3f8] dark:bg-gray-800 mt-5">
            {/* Header Section */}
            <div className="relative">
                <img
                    src={DashImg}
                    alt="Dashboard"
                    className="w-full h-80 object-cover rounded-lg shadow-lg"
                />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center text-indigo-400">
                    <h2 className="text-5xl font-bold">Welcome to Your Dashboard</h2>

                    <p className="text-lg mt-4">
                        Manage your profile, preferences, and more!
                    </p>
                </div>
            </div>

            {/* Main Dashboard Content */}
            <div className="space-y-12 mt-12">
                <div className="text-center">
                    <h2 className="text-3xl font-semibold text-pink-600">
                        Track Your Activity & Engagement
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Insights into your matches, messages, and more.
                    </p>
                </div>
                <div className="text-indigo-500 px-3 font-semibold py-5 text-lg">
                    <span> Hi, Welcome </span>
                    {user?.displayName ? user.displayName : "Black"}
                </div>

                {/* Cards Section */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Premium Membership Card */}
                    <Card className="shadow-xl bg-yellow-50 p-4 transition-transform hover:scale-105 transform border border-white/20 rounded-2xl flex flex-col items-center text-white text-center space-y-3">
                        <div className="flex justify-center items-center mb-3">
                            <CurrencyDollarIcon className="w-12 h-12 text-yellow-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-yellow-500">$76.00</h3>
                        <p className="text-gray-500 dark:text-white">Premium Membership</p>
                    </Card>

                    {/* Recent Matches Card */}
                    <Card className="shadow-xl bg-indigo-50 p-4 transition-transform hover:scale-105 transform border border-white/20 rounded-2xl flex flex-col items-center text-white text-center space-y-3">
                        <div className="flex justify-center items-center mb-3">
                            <TrophyIcon className="w-12 h-12 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-semibold text-yellow-500">
                            245 Matches
                        </h3>
                        <p className="text-gray-500 dark:text-white">Recent Matches</p>
                    </Card>

                    {/* Message Center Card */}
                    <Card className="shadow-xl bg-rose-50 p-4 transition-transform hover:scale-105 transform border border-white/20 rounded-2xl flex flex-col items-center text-white text-center space-y-3">
                        <div className="flex justify-center items-center mb-3">
                            <ChatBubbleLeftRightIcon className="w-12 h-12 text-pink-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-yellow-500">
                            53 New Messages
                        </h3>
                        <p className="text-gray-500 dark:text-white">Message Center</p>
                        <button className="mt-3 px-5 py-2 bg-gradient-to-r from-purple-300 to-pink-500 text-white rounded-lg hover:bg-gradient-to-l">
                            Check Messages
                        </button>
                    </Card>
                </div>

                {/* Pie Chart Section */}
                <div className="flex justify-center space-x-12 mb-12">
                    <PieChart width={350} height={350}>
                        <Pie
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            fill="#8884d8"
                            dataKey="value"
                            label
                        >
                            {pieData.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="top" height={36} />
                    </PieChart>
                    {/* lottie section */}
                    <div className="w-96 max-w-lg mx-auto mt-6">
                        <Lottie animationData={dashBoardLottie} />
                    </div>
                </div>

                {/* Line Chart Section */}
                <div className="bg-gradient-to-r from-purple-300 via-indigo-400 to-pink-400 p-6 rounded-xl shadow-2xl">
                    <h3 className="text-2xl font-semibold text-white text-center">
                        Monthly Engagement Progress
                    </h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <LineChart data={data}>
                            <XAxis dataKey="name" stroke="#fff" />
                            <YAxis stroke="#fff" />
                            <Tooltip />
                            <Line
                                type="monotone"
                                dataKey="value"
                                stroke="#fff"
                                strokeWidth={3}
                                dot={{ r: 5 }}
                                activeDot={{ r: 8 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashBoardHome;