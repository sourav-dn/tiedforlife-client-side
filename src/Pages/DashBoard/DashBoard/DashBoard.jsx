import { Button, Drawer, DrawerHeader,  DrawerItems, SidebarItem, SidebarItemGroup, SidebarItems, Sidebar, TextInput } from "flowbite-react";
import { useState } from "react";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import { HiChartPie, HiClipboardList, HiHeart, HiHome, HiInformationCircle, HiLogout, HiMenu, HiPencil, HiSearch, HiUsers } from "react-icons/hi";
import { MdAddCall, MdDashboardCustomize } from "react-icons/md";
import { FaCrown } from "react-icons/fa";
import { TiContacts } from "react-icons/ti";
import useAdmin from "../../../hooks/useAdmin";
import { NavLink, useNavigate } from "react-router";


const DashBoard = () => {

    const [isOpen, setIsOpen] = useState(true);
    const handleClose = () => setIsOpen(false);

    const navigate = useNavigate();

    const { logOut } = useAuth();
    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Successfully LogOut!",
                    icon: "success",
                    draggable: true,
                });
                navigate("/");
            })
            .catch((error) => {
                toast.error(error.message, error);
            });
    };

    // get isAdmin value from the database
    const [isAdmin] = useAdmin();

    return (
        <div>
            <div className="flex items-center p-4 bg-pink-200 text-white shadow-md">
                <Button
                    onClick={() => setIsOpen(true)}
                    className="text-xl bg-pink-400 hover:bg-pink-800"
                >
                    <HiMenu className="w-6 h-6" />
                </Button>
                <h1 className="ml-4 text-xl font-semibold text-pink-500">Dashboard
                </h1>

            </div>

            <Drawer
                open={isOpen}
                onClose={handleClose}
                className="bg-white shadow-2xl transition-all duration-300 ease-in-out"
            >
                <DrawerHeader title="DASHBOARD" className="text-pink-800 font-bold" />
                <DrawerItems>
                    <Sidebar
                        aria-label="Sidebar"
                        className="bg-pink-50 rounded-lg shadow-md"
                    >
                        <div className="p-4">
                            <form className="pb-3">
                                <TextInput
                                    icon={HiSearch}
                                    type="search"
                                    placeholder="Search"
                                    required
                                    className="w-full p-2 border rounded-lg focus:ring focus:ring-pink-300"
                                />
                            </form>

                            <SidebarItems>
                                {isAdmin ? (
                                    <>
                                        <SidebarItemGroup>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/"
                                                icon={HiHome}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Home
                                            </SidebarItem>

                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/adminDashboard"
                                                icon={MdDashboardCustomize}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Admin Home
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/users"
                                                icon={HiPencil}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Manage Users
                                            </SidebarItem>

                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/approvePremium"
                                                icon={FaCrown}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Approved Premium
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/approvedContact"
                                                icon={MdAddCall}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Approved Contact Request
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/successStories"
                                                icon={HiClipboardList}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                All Success Stories
                                            </SidebarItem>
                                        </SidebarItemGroup>
                                    </>
                                ) : (
                                    <>
                                        <SidebarItemGroup>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/"
                                                icon={HiHome}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Home
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/editBio"
                                                icon={HiPencil}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Edit BioData
                                            </SidebarItem>

                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/viewBio"
                                                icon={HiUsers}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                View Bio data
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/contact-request"
                                                icon={HiChartPie}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                My Contact Request
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/favoriteBio"
                                                icon={HiHeart}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Favorites BioData
                                            </SidebarItem>
                                            <SidebarItem
                                                as={NavLink}
                                                to="/dashboard/createStory"
                                                icon={HiClipboardList}
                                                className={({ isActive }) =>
                                                    isActive
                                                        ? "hover:bg-pink-100 text-pink-600"
                                                        : "hover:bg-pink-100"
                                                }
                                            >
                                                Create Success Story
                                            </SidebarItem>
                                        </SidebarItemGroup>
                                    </>
                                )}
                                {/* shared  nav links*/}
                                <SidebarItemGroup>
                                    <SidebarItem
                                        onClick={handleLogOut}
                                        icon={HiLogout}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "flex justify-between hover:bg-red-100 text-red-700"
                                                : "flex justify-between hover:bg-red-100 text-red-600"
                                        }
                                        style={{ cursor: 'pointer' }}
                                    >
                                        LogOut
                                    </SidebarItem>

                                    <SidebarItem
                                        as={NavLink}
                                        to="/aboutUs"
                                        icon={HiInformationCircle}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "hover:bg-gray-100 text-gray-600"
                                                : "hover:bg-gray-100"
                                        }
                                    >
                                        About Us
                                    </SidebarItem>
                                    <SidebarItem
                                        as={NavLink}
                                        to="/contactUs"
                                        icon={TiContacts}
                                        className={({ isActive }) =>
                                            isActive
                                                ? "hover:bg-gray-100 text-gray-600"
                                                : "hover:bg-gray-100"
                                        }
                                    >
                                        Contact Us
                                    </SidebarItem>
                                </SidebarItemGroup>
                            </SidebarItems>
                        </div>
                    </Sidebar>
                </DrawerItems>
            </Drawer>
        </div>
    );
};

export default DashBoard;