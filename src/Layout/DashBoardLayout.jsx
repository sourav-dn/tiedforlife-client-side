import { ToastContainer } from 'react-toastify';
import DashBoard from '../Pages/DashBoard/DashBoard/DashBoard';
import { Outlet } from 'react-router';

const DashBoardLayout = () => {
    return (
        <div>
            <ToastContainer></ToastContainer>
            <DashBoard></DashBoard>
            <Outlet></Outlet>
        </div>
    );
};

export default DashBoardLayout;