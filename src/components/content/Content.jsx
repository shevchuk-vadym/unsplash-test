import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Images } from '../Images';
import { getValue } from '@testing-library/user-event/dist/utils';

const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;

export const Content = () => {
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState();

  const searchPhoto = async () => {
    const responce = await fetch(
      'https://api.unsplash.com/search/photos?client_id=' +
        ACCES_KEY +
        '&query=' +
        inputValue
    );
    const res = await responce.json();
    setImages(res.results);
  };

  const fetchAPI = async () => {
    const response = await axios.get(
      'https://api.unsplash.com/photos/?client_id=' + ACCES_KEY
    );
    const data = await response.data;
    setImages(data);
  };
  useEffect(() => {
    fetchAPI();
  }, []);

  return (
    <div>
      <input
        type='text'
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder='search photo'
        id='unsplash'
      />
      <button onClick={searchPhoto}> SEARCH</button>
      <Images images={images} />
    </div>
  );
};
