import { useState, useEffect } from "react";

function useFetch(endpoint, token) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const url = `${import.meta.env.VITE_API_URL}${endpoint}`;

  useEffect(() => {
    if (!token) {
      setLoading(false);
      return;
    }

    setLoading(true);
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [reloadKey, token]);

  const refetch = () => setReloadKey((k) => k + 1);

  return { data, loading, error, refetch };
}

export default useFetch;