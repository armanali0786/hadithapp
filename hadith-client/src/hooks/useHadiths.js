import { useState, useEffect } from "react";
import axios from "axios";

export default function useHadiths() {
  const [hadithTypes, setHadithTypes] = useState([]);
  const [hadithList, setHadithList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHadithTypes = async () => {
    const response = await axios.get("http://localhost:4040/hadith-type");
    const allType = { _id: "all", hadithtype: "All" };
    setHadithTypes([allType, ...response.data.hadithType]);
  };

  const fetchAllHadiths = async () => {
    const response = await axios.get("http://localhost:4040/hadith-list");
    setHadithList(response.data.data.hadithlist);
  };

  const fetchHadithsByType = async (typeId) => {
    if (typeId === "all") {
      return fetchAllHadiths();
    }
    const response = await axios.get(
      `http://localhost:4040/hadith-list/filter?hadithTypeId=${typeId}`
    );
    setHadithList(response.data.data.hadithList);
  };

  const loadInitialData = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchHadithTypes(), fetchAllHadiths()]);
      setError(null);
    } catch (err) {
      console.error(err);
      setError("Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, []);

  return {
    hadithTypes,
    hadithList,
    loading,
    error,
    fetchHadithsByType
  };
}
