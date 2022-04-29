import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Images} from '../Images';
import { render } from '@testing-library/react';
const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;

const Content = () => {
  const [images, setImages] = useState([]);

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
    console.log('useEffect');
  }, []);
  console.log('RENDER');
  return (
    <div>
      {/* <button onClick={fetchAPI}> CLICK ME!</button> */}
      <Images images={images} />
    </div>
  );
};

export default Content;
