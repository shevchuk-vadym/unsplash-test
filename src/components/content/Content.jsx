import React, { useEffect, useState } from 'react';
import { Images } from '../Images';
import { OAuthContext } from '../../contexts/OAuthContext';
import { getFromLocalStorage } from '../utils/storages';
import s from './Content.module.scss';
import searchSVG from '../assets/search-svgrepo-com.svg';
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
      <div className={s.header}>
        <div className={s.header_logo}>
          <img
            src='https://unsplash.com/assets/core/logo-black-df2168ed0c378fa5506b1816e75eb379d06cfcd0af01e07a2eb813ae9b5d7405.svg'
            alt='logo'
          />
        </div>
        <input
          className={s.header_input}
          type='search'
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder='search photo'
          id='unsplash'
        />
        <button className={s.header_button} onClick={searchPhoto}>
          <img src={searchSVG} alt='' />
        </button>
        <div className={s.header_userInfo}>
          {links()} <div className={s.header_userInfo__logo}></div>
        </div>
        <div className={s.header_menuToggle}>
          <div className={s.header_menuToggle__burger}></div>
        </div>
      </div>
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
