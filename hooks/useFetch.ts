// import axios from 'axios';
// import { useEffect, useState } from 'react';

// const timbuApiKey = '5aaadee3ec314354855418b0f8efd73c20240710140519730992';
// const timbuAppID = 'H1BNIBTIM2FX1EQ';
// const timbuOrganizationID = '10986883f9d2409db78d013bb6928f0aS';

// const useFetch = () => {
//   const [data, setData] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isError, setIsError] = useState(null);

//   const url = `https://api.timbu.cloud/products?organization_id=${timbuOrganizationID}&reverse_sort=false&page=1&size=10&Appid=${timbuAppID}&Apikey=${timbuApiKey}`;

//   const fetchData = async () => {
//     setIsLoading(true);
//     setIsError(null);

//     try {
//       const response = await axios.get(url);
//       const products = response.data.items;

// Set the fetched data to the state
//       setData(products);
//     } catch (error: any) {
//       // Set the error to the state and display an alert message
//       setIsError(error);
//       alert(`There is an error: ${error.response?.data?.message || error.message}`);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Refetch the data when the component is re-rendered
//   const refetch = () => {
//     setIsLoading(true);
//     fetchData();
//   };

//   return { data, isLoading, isError, refetch };
// };

// export default useFetch;

import axios from 'axios';
import { useEffect, useState } from 'react';

const timbuApiKey = '5aaadee3ec314354855418b0f8efd73c20240710140519730992';
const timbuAppID = 'H1BNIBTIM2FX1EQ';
const timbuOrganizationID = '10986883f9d2409db78d013bb6928f0a';

const useFetch = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const url = `https://api.timbu.cloud/products?organization_id=${timbuOrganizationID}&reverse_sort=false&page=1&size=10&Appid=${timbuAppID}&Apikey=${timbuApiKey}`;

  const fetchData = async () => {
    setIsLoading(true);
    setIsError(null);

    try {
      const response = await axios.get(url);
      const products = response.data.items;

      // Set the fetched data to the state
      setData(products);
    } catch (error: any) {
      setIsError(error);
      alert(`There is an error: ${error.response?.data?.message || error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetch = () => {
    setIsLoading(true);
    fetchData();
  };

  return { data, isLoading, isError, refetch };
};

export default useFetch;
