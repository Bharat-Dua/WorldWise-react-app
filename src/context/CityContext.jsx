import { createContext, useState, useEffect } from "react";

const BASE_URL = "http://localhost:8000";

// step: 1 create
const CitiesContext = createContext();

// step: 2 provider
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);
  const CitiesContextValues = { isLoading, cities };
  return (
    <CitiesContext.Provider value={CitiesContextValues}>
      {children}
    </CitiesContext.Provider>
  );
}

export { CitiesContext, CitiesProvider };
