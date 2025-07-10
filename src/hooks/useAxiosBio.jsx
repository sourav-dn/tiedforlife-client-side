import axios from "axios";
import { useState } from "react";


const useAxiosBio = () => {
    const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Base URL for API
  const baseUrl = '/bioData';

  // Axios request for GET (Fetch biodata)
  const getBiodata = async (biodataId) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(`${baseUrl}/${biodataId}`);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError('Error fetching biodata');
      console.error(err);
      throw err;
    }
  };

  // Axios request for POST (Create new biodata)
  const createBiodata = async (biodata) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(baseUrl, biodata);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError('Error saving biodata');
      console.error(err);
      throw err;
    }
  };

  // Axios request for PUT (Update existing biodata)
  const updateBiodata = async (biodataId, biodata) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`${baseUrl}/${biodataId}`, biodata);
      setLoading(false);
      return response.data;
    } catch (err) {
      setLoading(false);
      setError('Error updating biodata');
      console.error(err);
      throw err;
    }
  };

  return { getBiodata, createBiodata, updateBiodata, loading, error };
};

export default useAxiosBio;