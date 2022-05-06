import React from 'react';

const ACCES_KEY = process.env.REACT_APP_ACCES_KEY;

export class LogIn extends React.Component {
  render() {
    const redirect_url = 'http://localhost:3000/oauth';
    const responce_type = 'code';
    const scope = 'public';
    const URL = `https://unsplash.com/oauth/authorize?client_id=${ACCES_KEY}&redirect_uri=${redirect_url}&response_type=${responce_type}&scope=${scope}`;
    return (
      <div>
        <a href={URL}>Login to UNSPLASH</a>
        <h3>Please login</h3>
      </div>
    );
  }
}
