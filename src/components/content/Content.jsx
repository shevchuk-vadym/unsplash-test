import React, { useContext, useEffect, useState } from 'react';
import { Images } from '../Images';
import { OAuthContext } from '../../contexts/OAuthContext';
import { ContentContext } from '../../contexts/ContentContext';
import { getFromLocalStorage } from '../utils/storages';
import { Header } from '../Header';
import s from './Content.module.scss';
import { ModalContext, ModalProvider } from '../../contexts/ModalContext';
import { ModalWindow } from '../ModalWindow/ModalWIndow';

const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;

const Content = ({ token, tokenKey, links, user }) => {
  const { openModal, closeModal } = useContext(ModalContext);
  const [page, setPage] = useState(1);
  const [images, setImages] = useState([]);
  console.log(user);
  const [query, setQuery] = useState('');
  const getToken = async () => {
    const token = getFromLocalStorage(tokenKey);
    return token;
  };

  const searchPhoto = async ({ page, per_page, query }) => {
    const responce = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&client_id=${ACCES_KEY}&query=${query}`,
      {
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      }
    );
    const res = await responce.json();
    console.log([...images, ...res.results]);
    setImages([...images, ...res.results]);
  };

  // const getUrl = (isSearch, { page, per_page, query }) => {
  //   if (isSearch) {
  //     return `https://api.unsplash.com/search/photos?page=${page}&per_page=${per_page}&client_id=${ACCES_KEY}&query=${query}`;
  //   } else {
  //     return `https://api.unsplash.com/photos?page=${page}&per_page=${per_page}&client_id=${ACCES_KEY}`;
  //   }
  // };

  const fetchAPI = async ({ page, per_page }) => {
    const headers = {};
    console.log('====', token);
    if (token) {
      headers.Authorization = `Bearer ${token.access_token}`;
    }
    console.log(headers);
    const response = await fetch(
      `https://api.unsplash.com/photos?page=${page}&per_page=${per_page}&client_id=${ACCES_KEY}`,
      {
        method: 'GET',
        headers: headers,
      }
    );
    const data = await response.json();
    console.log([...images, ...data]);
    setImages([...images, ...data]);
  };
  useEffect(() => {
    if (query) {
      searchPhoto({ page, per_page: 12, query });
    } else {
      fetchAPI({ page, per_page: 12, query });
    }
  }, [page, query, token]);

  function morePhoto() {
    console.log(page);
    setPage(page + 1);
  }

  const search = (value) => {
    setImages([]);
    setQuery(value);
  };
  console.log('HHHHHHEEEEEELLLLOOOOO', images);
  return (
    <ModalProvider>
      <div className={s.root}>
        <Header onSearch={search} links={links} user={user} />
        {/* <ModalWindow /> */}
        <Images images={images} onLike={(photoId) => {}} />
        <button onClick={morePhoto}>MORE PHOTO</button>
      </div>
    </ModalProvider>
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
          user={value.user}
        />
      )}
    </OAuthContext.Consumer>
  );
};

export { WithToken as Content };
