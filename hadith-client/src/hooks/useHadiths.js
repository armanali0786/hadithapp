import { useState, useEffect } from "react";
import axios from "axios";

export default function useHadiths() {
  const [hadithTypes, setHadithTypes] = useState([]);
  const [hadithList, setHadithList] = useState([]);
  const [loading, setLoading] = useState(true);       // initial page load
  const [filtering, setFiltering] = useState(false);  // category switch
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
    setFiltering(true);
    try {
      if (typeId === "all") {
        await fetchAllHadiths();
      } else {
        const response = await axios.get(
          `http://localhost:4040/hadith-list/filter?hadithTypeId=${typeId}`
        );
        setHadithList(response.data.data.hadithList);
      }
    } catch (err) {
      console.error(err);
      setError("Failed to load Hadiths for this category.");
    } finally {
      setFiltering(false);
    }
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
    filtering,
    error,
    fetchHadithsByType,
  };
}
