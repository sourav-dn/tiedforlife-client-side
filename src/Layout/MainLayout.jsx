import { Outlet, useLocation } from 'react-router';
import CustomNavbar from '../Components/Shared/Navbar/CustomNavbar';
import { ToastContainer } from 'react-toastify';
import CustomFooter from '../Components/Shared/Footer/CustomFooter';
import { useEffect, useState } from 'react';

const MainLayout = () => {
    const location = useLocation();
    // console.log(location);
    const [darkMode, setDarkMode] = useState(false);


    // Dark mode toggle effect
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const noFoot = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            <ToastContainer></ToastContainer>
            <CustomNavbar darkMode={darkMode} setDarkMode={setDarkMode}></CustomNavbar>
            <div className="min-h-[calc(100vh-350px)]">
                <Outlet />
            </div>
            {noFoot || <CustomFooter />}
        </div>
    );
};

export default MainLayout;

