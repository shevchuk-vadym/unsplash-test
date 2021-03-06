import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { OAuthContext } from '../../contexts/OAuthContext';
import { setToLocalStorage } from '../utils/storages';
import { Navigate } from 'react-router';

const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;
const SECRET_KEY = process.env.REACT_APP_SECRET_KEY;
const client = {
  client_id: ACCES_KEY,
  client_secret: 'odIFUwjl89dkikaeyjgRHlYi5AdamvMkcsUeyzc5Pdc',
  redirect_uri: 'http://localhost:3000/oauth',
  grant_type: 'authorization_code',
};

const OAuth = ({ setToken, TOKEN_STORAGE_KEY }) => {
  const [code, setCode] = useState();
  const [wasTokenSaved, setWasTokenSaved] = useState(false);
  useEffect(() => {
    setCode(window.location.search.split('=')[1]);
  }, []);

  useEffect(() => {
    if (!code) {
      return;
    }
    const getToken = async () => {
      const response = await axios.post(
        `https://unsplash.com/oauth/token?client_id=${client.client_id}&client_secret=${client.client_secret}&redirect_uri=${client.redirect_uri}&code=${code}&grant_type=${client.grant_type}`
      );
      const data = await response.data;
      console.log(data);
      setToken(data);
      setToLocalStorage(TOKEN_STORAGE_KEY, JSON.stringify(data));
      setWasTokenSaved(true);
    };
    getToken();
  }, [code]);

  if (wasTokenSaved) {
    // redirect to content
    return <Navigate to='/' replace />;
  }

  console.log(code);
  return (
    <div>
      <h2>{code}</h2>
    </div>
  );
};
const WithOAuthContext = () => {
  return (
    <OAuthContext.Consumer>
      {(value) => {
        return <OAuth {...value} />;
      }}
    </OAuthContext.Consumer>
  );
};
export { WithOAuthContext as OAuth };
