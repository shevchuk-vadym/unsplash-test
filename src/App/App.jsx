import React from 'react';
import { Route, Routes, Link } from 'react-router-dom';
import './App.css';
import { Content } from '../components/content';
import { LogIn } from '../components/LogIn';
import { OAuth } from '../components/OAuth';

export const App = () => {
  // const [token, setToken] = useState();
  // useEffect(() => {
  //   setToken();
  // }, []);

  function renderLinks() {
    return (
      <header>
        <Link to='/'>LOGIN</Link>
        <Link to='/content'>CONTENT</Link>
      </header>
    );
  }
  return (
    <div>
      {renderLinks()}

      <Routes>
        <Route path='/content' element={<Content />} />
        <Route path='/' element={<LogIn />} />
        <Route
          path='/oauth'
          render={(...props) => (
            <OAuth
              {...props}
              onSuccesRequest={(token) => {
                console.log(token);
              }}
            />
          )}
        />
      </Routes>
    </div>
  );
};
