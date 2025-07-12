import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const usePremium = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: isPremium, isLoading: isPremiumLoading } = useQuery({
        queryKey: [user?.email, 'isPremium'],
        enabled: !loading && !!user?.email, // Only run if user is loaded and has an email
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/premium/${user.email}`);
            return res.data.premium;
        }
    });
    return [isPremium, isPremiumLoading];
};

export default usePremium;