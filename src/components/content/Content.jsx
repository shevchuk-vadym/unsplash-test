import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Images } from '../Images';
import { getValue } from '@testing-library/user-event/dist/utils';

const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;

const Content = () => {
  // const search = document.getElementById('unsplash').value;
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState();
  const searchPhoto = async () => {
    const response = await axios.get(
      'https://api.unsplash.com/search/photos?client_id=' +
        ACCES_KEY +
        '&query=' +
        inputValue
    );
    const data = await response.data;
    setImages(data.results);
    console.log(images);
  };

  const fetchAPI = async () => {
    const response = await axios.get(
      'https://api.unsplash.com/photos/?client_id=' + ACCES_KEY
    );
    const data = await response.data;
    setImages(data);
    console.log(images);
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
      <button onClick={searchPhoto}> CLICK ME!</button>
      <Images images={images} />
    </div>
  );
};

export default Content;
