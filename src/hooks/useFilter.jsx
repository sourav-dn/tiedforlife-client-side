import React, { useEffect, useState } from 'react';
import useAxiosSecure from './useAxiosSecure';

const useFilter = (minAge, maxAge, gender, division) => {

    const axiosSecure = useAxiosSecure();
    const [loading, setLoading] = useState(true);
    const [bioData, setBioData] = useState([]); 

    useEffect(() => {
        setLoading(true);
        const params = new URLSearchParams();

        if (minAge) params.append("minAge", minAge);
        if (maxAge) params.append("maxAge", maxAge);
        if (gender) params.append("gender", gender);
        if (division) params.append("division", division);

        axiosSecure
            .get(`/bioData?${params.toString()}`, { withCredentials: true })
            .then((res) => {
                setBioData(res.data); 
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching bioData:", error);
                setLoading(false);
            });
    }, [minAge, maxAge, gender, division]);

    return { loading, bioData, setBioData };

};

export default useFilter;