import { useEffect, useState } from 'react';
import yelp from '../api/yelp';

export default () => {
  const [results, setResults] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');

  const searchApi = async (searchTerm) => {
    try {
      const response = await yelp.get('/search', {
        params: {
          limit: 50,
          term: searchTerm,
          location: 'san jose',
        },
      });
      setResults(response.data.businesses);
    } catch (err) {
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
