import { useEffect, useState } from 'react';
import yelp from '../api/yelp';
import useLocation from '../hooks/useLocation';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      let data = await useLocation();
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm ? searchTerm : '',
          // latitude: data.coords.latitude,
          // longitude: data.coords.longitude,
          latitude: 38.882071,
          longitude: -77.11184,
          radius: 40000,
        },
      });
      setResults(response.data.businesses);
    } catch (err) {
      console.log('error is', err);
      setErrorMessage('Something went wrong');
    }
  };

  useEffect(() => {
    const foods = ['Pasta', 'Naan Masala', 'Pizza', 'Fast Food', 'Drinks'];
    //generates random numbers between 1 to 5
    const randIndx = Math.round((Math.random() * 10) / 2);
    searchApi(foods[randIndx - 1]);
  }, []);

  return [searchApi, results, errorMessage];
};
