import axios from 'axios';


const axiosPublic = axios.create({
    baseURL: 'https://matrimony-server-side-nu.vercel.app'
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;