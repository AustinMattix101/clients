import axios from "axios";
import { useState, useEffect } from "react"

const useFetch = (url:string) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchData = async () => {
        const config = {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
              },
        }

        setLoading(true);

        try {
            const { data } = await axios.get(url, config);
            setData(data);

        } catch (error) {
            setError(true);
        }

        setLoading(false);
      }

      fetchData();

    }, [url]);
    
    const reFetch = async () => {
        const config = {
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/json"
              },
        }

        setLoading(true);

        try {
            const { data } = await axios.get(url, config);
            setData(data);

        } catch (error) {
            setError(true);
        }

        setLoading(false);
      }

      return { data, loading, error, reFetch }
}

export default useFetch;