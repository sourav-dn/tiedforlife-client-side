import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";


const useInfo = () => {
    const axiosSecure = useAxiosSecure();
    const {user} = useAuth();
    //tan stack query
   const {refetch, data: info=[]} = useQuery({
    queryKey: ['info', user?.email],
    queryFn: async () =>{
        const res = await axiosSecure.get(`/bioData?email=${user.email}`)
        return res.data;
    }
   })
   return[info, refetch]
};

export default useInfo;