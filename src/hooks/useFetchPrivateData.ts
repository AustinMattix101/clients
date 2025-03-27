import axios from "axios";
import { useEffect, useState } from "react";

const useFetchPrivateData = (url:string) => {
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    
    useEffect(() => {
        const fetchDataPrivateData = async () => {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("authToken")}`
                }
            }
            setLoading(true);
        
            try {
                const { data } = await axios.get(url, config);

                setData(data);
        
            } catch (error:any) {
                console.log("You are not authorized please login!", error);
                setError(error);
            }
            setLoading(false);
        }
        fetchDataPrivateData();

    }, [url]);

    const reFetchPrivateData = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("authToken")}`
            }
        }
        setLoading(true);
    
        try {
            const { data } = await axios.get(url, config);

            setData(data);
    
        } catch (error:any) {
            localStorage.removeItem("authToken");
            console.log("You are not authorized please login!", error);
            setError(error);
        }
        setLoading(false);
    }

    return { data, error, loading, reFetchPrivateData }
  }

export default useFetchPrivateData;