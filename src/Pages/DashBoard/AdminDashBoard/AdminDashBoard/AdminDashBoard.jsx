import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";
import { FaFemale, FaMale, FaMoneyBillWave, FaStar, FaUsers } from "react-icons/fa";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import { Card } from "flowbite-react";


const AdminDashBoard = () => {

    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats = {} } = useQuery({
        queryKey: ["admin-stats"],
        queryFn: async () => {
            const res = await axiosSecure.get("/admin-stats");
            return res.data;
        },
    });

    const data = {
        totalBiodata: stats?.biodatas || 300,
        maleBiodata: stats?.maleCount || 300,
        femaleBiodata: stats?.femaleCount || 300,
        premiumBiodata: stats?.premiumPay || 300,
        totalRevenue: stats?.revenue || 2500,
    };

    const pieChartData = [
        { name: "Total Biodata", value: data.totalBiodata },
        { name: "Male Biodata", value: data.maleBiodata },
        { name: "Female Biodata", value: data.femaleBiodata },
        { name: "Premium Biodata", value: data.premiumBiodata },
        { name: "Total Revenue", value: data.totalRevenue / 100 },
    ];

    const COLORS = ["#6366F1", "#31a7a1", "#F59E0B", "#6688ed", "#EC4899"];
    const cardColors = ["#4f46e5", "#06b6d4", "#facc15", "#ef4444", "#10b981"];
    const icons = [FaUsers, FaMale, FaFemale, FaStar, FaMoneyBillWave];
    const titles = ["Total Biodata", "Male Biodata", "Female Biodata", "Premium Biodata", "Total Revenue"];

    const isDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

    return (
        <div className="min-h-screen bg-[#f9fafb] dark:bg-[#111827] p-8 text-gray-900 dark:text-gray-100">
            <h2 className="text-3xl font-bold text-center mb-8 text-indigo-600 dark:text-indigo-400">
                Admin Dashboard
            </h2>

            <div className="text-indigo-500 dark:text-indigo-300 px-3 font-semibold py-5 text-lg">
                <span>Hi, Welcome </span>
                {user?.displayName || "Admin"}
            </div>

            {/* Cards Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-10">
                {titles.map((title, index) => {
                    const Icon = icons[index];
                    let value = 0;

                    if (title === "Total Biodata") value = data.totalBiodata;
                    if (title === "Male Biodata") value = data.maleBiodata;
                    if (title === "Female Biodata") value = data.femaleBiodata;
                    if (title === "Premium Biodata") value = data.premiumBiodata;
                    if (title === "Total Revenue") value = `৳${data.totalRevenue}`;

                    return (
                        <Card
                            key={index}
                            className="p-8 shadow-md border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 rounded-lg"
                        >
                            <div className="flex items-center space-x-4">
                                <div
                                    className="w-16 h-16 rounded-full flex items-center justify-center"
                                    style={{ backgroundColor: cardColors[index] }}
                                >
                                    <Icon className="text-3xl text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold">{title}</h3>
                                    <p className="text-3xl font-bold mt-1">{value}</p>
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>

            {/* Pie Chart Section */}
            <div className="flex justify-center">
                <PieChart width={400} height={400}>
                    <Pie
                        data={pieChartData}
                        cx="50%"
                        cy="50%"
                        label
                        outerRadius={150}
                        dataKey="value"
                    >
                        {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDarkMode ? "#1f2937" : "#ffffff",
                            color: isDarkMode ? "#ffffff" : "#1f2937",
                            borderRadius: "10px",
                            fontSize: "14px",
                        }}
                    />
                    <Legend
                        wrapperStyle={{
                            color: isDarkMode ? "white" : "black",
                            fontSize: "14px",
                        }}
                    />
                </PieChart>
            </div>
        </div>
    );
};

export default AdminDashBoard;