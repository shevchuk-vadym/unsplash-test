import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { Content } from '../components/Content';
import { LogIn } from '../components/LogIn';
import { OAuth } from '../components/OAuth';
import { OAuthContext } from '../contexts/OAuthContext';
import { getFromLocalStorage } from '../components/utils/storages';
import { Header } from '../components/Header';
import { ModalProvider } from '../contexts/ModalContext';
import { Profile } from '../components/Profile/Profile';

export const App = () => {
  const [token, setToken] = React.useState(undefined);
  const [user, setUser] = React.useState(undefined);
  const TOKEN_STORAGE_KEY = 'TOKEN';
  const renderLinks = () => {
    return (
      <div>
        {!user ? <Link to='/login'>LOGIN IN</Link> : `hello ${user.first_name}`}
        {/* <Link to='/content'>CONTENT</Link> */}
        {/* {token ? 'hello User' : 'log in'} */}
      </div>
    );
  };
  useEffect(() => {
    const tokenFromLocalStorage = window.localStorage.getItem('TOKEN');
    console.log(tokenFromLocalStorage);
    if (tokenFromLocalStorage) {
      setToken(JSON.parse(tokenFromLocalStorage));
    }
  }, []);

  useEffect(() => {
    if (!token) {
      return;
    }

    const t = () => {
      fetch('https://api.unsplash.com/me', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token.access_token}`,
        },
      })
        .then((t) => {
          console.log(t);
          return t.json();
        })
        .then((user) => {
          console.log(user);
          setUser(user);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    t();
  }, [token]);

  return (
    <OAuthContext.Provider
      value={{ token, user, setToken, TOKEN_STORAGE_KEY, renderLinks }}
    >
      <div>
        {/* <Header links={renderLinks} />
          {token ? <Link to='/content'>CONTENT</Link> : ''} */}
        <Routes>
          <Route path='/' element={<Content />} tokenKey={TOKEN_STORAGE_KEY} />
          <Route path='/login' element={<LogIn />} />
          <Route path='/oauth' element={<OAuth />} />
          <Route path='/user/:username' element={<Profile />} />
        </Routes>
      </div>
    </OAuthContext.Provider>
  );
};
