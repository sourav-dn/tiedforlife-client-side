import { Navigate, useLocation } from "react-router";
import useAuth from "../hooks/useAuth";
import Loading from "../Components/Shared/Loading/Loading";


const PrivateRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();

    if (user) {
        return children;
    }

    if (loading) {
        return <Loading />
    }


    return <Navigate to='/login' state={{ form: location }} replace />
};

export default PrivateRoute;