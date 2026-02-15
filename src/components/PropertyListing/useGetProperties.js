import { useEffect, useState } from "react";

const PROPERTIES_URL = 'http://localhost:3000/api/properties';

const useGetProperties = () => {
    const [properties, setProperties] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        try {
            const response = await fetch(PROPERTIES_URL);
            if (!response.ok) {
                throw new Error(`
                    status : ${response.status}, 
                    message : Failed to fetch properties`
                );
            }
            const properties = await response.json();
            setProperties(properties);
        } catch (e) {
            // log
            setError(e.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProperties();
    }, []);

    return { properties, error, loading };
}

export default useGetProperties;