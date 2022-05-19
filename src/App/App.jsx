import React, { useEffect } from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { Content } from '../components/content';
import { LogIn } from '../components/LogIn';
import { OAuth } from '../components/OAuth';
import { OAuthContext } from '../contexts/OAuthContext';
import { getFromLocalStorage } from '../components/utils/storages';

export const App = () => {
  const [token, setToken] = React.useState(undefined);
  // console.log(token.access_token, token.token_type);
  const TOKEN_STORAGE_KEY = 'TOKEN';

  const renderLinks = () => {
    return (
      <div>
        {!token ? <Link to='/'>LOGIN IN</Link> : ''}
        {/* <Link to='/content'>CONTENT</Link> */}
        {token ? 'hello User' : 'please log in'}
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

  return (
    <OAuthContext.Provider
      value={{ token, setToken, TOKEN_STORAGE_KEY, renderLinks }}
    >
      <div>
        {token ? <Link to='/content'>CONTENT</Link> : ''}
        <Routes>
          <Route
            path='/content'
            element={<Content />}
            tokenKey={TOKEN_STORAGE_KEY}
          />
          <Route path='/' element={<LogIn />} />
          <Route path='/oauth' element={<OAuth />} />
        </Routes>
      </div>
    </OAuthContext.Provider>
  );
};
