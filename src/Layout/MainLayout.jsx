import { Outlet, useLocation } from 'react-router';
import CustomNavbar from '../Components/Shared/Navbar/CustomNavbar';
import { ToastContainer } from 'react-toastify';
import CustomFooter from '../Components/Shared/Footer/CustomFooter';

const MainLayout = () => {
    const location = useLocation();
    // console.log(location);

    const noFoot = location.pathname.includes('login') || location.pathname.includes('register')
    return (
        <div>
            <ToastContainer></ToastContainer>
            <CustomNavbar></CustomNavbar>
            <div className="min-h-[calc(100vh-350px)]">
                <Outlet />
            </div>
            {noFoot || <CustomFooter />}
        </div>
    );
};

export default MainLayout;