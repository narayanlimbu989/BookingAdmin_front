import { useEffect, useState } from "react";
import { api } from "../Http_service/Httpservice";

export const useFatch = (url) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, seterr] = useState(false);

  useEffect(() => {
    const fatchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(url);
        setData(response.data);
      } catch (error) {
        seterr(err);
      }
      setLoading(false);
    };
    fatchData();
  }, [url]);

  return { data, loading, err };
};
