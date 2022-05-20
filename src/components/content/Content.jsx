import React, { useEffect, useState } from 'react';
import { Images } from '../Images';
import { OAuthContext } from '../../contexts/OAuthContext';
import { getFromLocalStorage } from '../utils/storages';
import { Header } from '../Header';
import s from './Content.module.scss';

const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;

const Content = ({ token, tokenKey, links }) => {
  const [count, setCount] = useState(1);
  const [images, setImages] = useState([]);
  const [inputValue, setInputValue] = useState();
  const getToken = async () => {
    const token = getFromLocalStorage(tokenKey);
    return token;
  };

  const searchPhoto = async () => {
    const responce = await fetch(
      `https://api.unsplash.com/search/photos?page=${count}&client_id=${ACCES_KEY}&query=${inputValue}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_key}`,
        },
      }
    );
    const res = await responce.json();
    setImages(res.results);
  };

  const fetchAPI = async () => {
    const headers = {};
    if (token) {
      headers.Authorization = `Bearer ${token.access_key}`;
    }
    const response = await fetch(
      `https://api.unsplash.com/photos/?page=${count}&client_id=${ACCES_KEY}`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    const data = await response.json();
    setImages(data);
  };
  useEffect(() => {
    fetchAPI();
  }, []);
  function morePhoto() {
    setCount(count + 1);
    fetchAPI();
  }

  return (
    <div className={s.root}>
      <Header
        searchPhoto={searchPhoto}
        setInputValue={setInputValue}
        inputValue={inputValue}
        links={links}
      />
      <Images images={images} onLike={(photoId) => {}} />
      <button onClick={morePhoto}>MORE PHOTO</button>
    </div>
  );
};

const WithToken = () => {
  return (
    <OAuthContext.Consumer>
      {(value) => (
        <Content
          token={value.token}
          tokenKey={value.TOKEN_STORAGE_KEY}
          links={value.renderLinks}
        />
      )}
    </OAuthContext.Consumer>
  );
};

export { WithToken as Content };
