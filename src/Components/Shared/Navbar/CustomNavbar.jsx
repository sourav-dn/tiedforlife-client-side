import { Navbar, NavbarBrand, NavbarToggle, NavbarCollapse, NavbarLink, Dropdown, Avatar, DropdownHeader, DropdownItem, DropdownDivider } from "flowbite-react";
import logo from "../../../assets/logo.png";
import { useContext } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import userIcon from "../../../assets/user.png";
import { Link, NavLink } from "react-router";
// import { AuthContext } from "../../../Provider/AuthProvider";
// import DataTheme from "./DataTheme";
import { AuthContext } from "../../../Provider/AuthContext";





const CustomNavbar = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                Swal.fire({
                    title: "Successfully LogOut!",
                    icon: "success",
                    draggable: true,
                });
            })
            .catch((error) => {
                toast.error(error.message, error);
            });
    };

    return (
        <Navbar fluid rounded className="bg-opacity-30 bg-pink-200">
            <NavbarBrand as={NavLink} to="/">
                <img src={logo} className="mr-3 h-6 sm:h-9" alt="Logo" />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Tied<span className="text-pink-500">4</span>Life
                </span>
            </NavbarBrand>

            <div className="flex md:order-2 gap-4">
                {/* <DataTheme /> */}
                <Dropdown
                    arrowIcon={false}
                    inline
                    label={
                        <Avatar
                            alt="User settings"
                            img={user?.photoURL || userIcon}
                            rounded
                        />
                    }
                >
                    <DropdownHeader>
                        {user ? (
                            <>
                                <span className="block text-sm">{user?.displayName}</span>
                                <span className="block truncate text-sm font-medium">
                                    {user?.email}
                                </span>
                            </>
                        ) : (
                            <span className="block text-sm text-gray-500">Guest</span>
                        )}
                    </DropdownHeader>
                    <DropdownDivider />
                    {user ? (
                        <DropdownItem onClick={handleLogOut}>Log Out</DropdownItem>
                    ) : (
                        <DropdownItem as={NavLink} to="/login">
                            Login
                        </DropdownItem>
                    )}
                </Dropdown>
                <NavbarToggle />
            </div>

            <NavbarCollapse>
                <NavbarLink as={NavLink} to="/" className={({ isActive }) =>
                    isActive ? "text-pink-800 font-bold" : "text-white"
                }>Home</NavbarLink>
                <NavbarLink as={NavLink} to="/bioData" className={({ isActive }) =>
                    isActive ? "text-pink-800 font-bold" : "text-white"
                }>Bio-Data</NavbarLink>
                <NavbarLink as={NavLink} to="/aboutUs" className={({ isActive }) =>
                    isActive ? "text-pink-800 font-bold" : "text-white"
                }>About Us</NavbarLink>
                <NavbarLink as={NavLink} to="/contactUs" className={({ isActive }) =>
                    isActive ? "text-pink-800 font-bold" : "text-white"
                }>Contact Us</NavbarLink>

                {user && (
                    <NavbarLink as={NavLink} to="/dashboard" className={({ isActive }) =>
                        isActive ? "text-pink-800 font-bold" : "text-white"
                    }>Dashboard</NavbarLink>
                )}
            </NavbarCollapse>
        </Navbar>
    );
};

export default CustomNavbar;