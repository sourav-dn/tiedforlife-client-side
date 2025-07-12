import { Navigate, useLocation } from "react-router";
import useAdmin from "../hooks/useAdmin";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Shared/Loading/Loading";


const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <Loading />;
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to="/login" state={{ form: location }} replace />;
};

export default AdminRoute;