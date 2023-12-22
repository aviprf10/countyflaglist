// App.js

import React, { useState, useEffect } from 'react';
import './App.css';

const API_ENDPOINT = 'https://restcountries.com/v3.1/all';

const CountryCard = ({ country }) => {
  const { name, flags } = country;

  return (
    <div className="country-card">
      <img src={flags.svg} alt={`${name.common} Flag`} />
      <p>{name.common}</p>
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API_ENDPOINT);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error fetching data:', error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="country-list">
          {countries.map((country, index) => (
            <CountryCard key={index} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
