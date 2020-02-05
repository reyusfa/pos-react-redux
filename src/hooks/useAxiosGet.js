import { useState, useEffect } from 'react';
import axios from 'axios';
import qs from 'qs';

const useAxiosGet = (url, headers = {}) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(url, headers);
        setResponse(res.data.data);
      } catch (error) {
        setError(error.response.data);
      }
    };
    fetchData();
  }, []);

  return { response, error };
};

export default useAxiosGet;
