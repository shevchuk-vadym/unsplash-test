import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import searchSVG from '../assets/search-svgrepo-com.svg';

import s from './Header.module.scss';
const Header = ({ links, onSearch, user }) => {
  const [active, setActive] = useState(false);
  console.log('USER HERE', user);
  const [inputValue, setInputValue] = useState('');

  const onChange = useCallback((e) => setInputValue(e.target.value), []);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(inputValue);
  });
  const onClickBurger = () => {
    !active ? setActive(true) : setActive(false);
  };
  const headerMenu = active
    ? `${s.header_menu} ${s.header_menu__active}`
    : `${s.header_menu}`;

  return (
    <div className={s.header}>
      <Link to='/'>
        <div className={s.header_logo}>
          <img
            src='https://unsplash.com/assets/core/logo-black-df2168ed0c378fa5506b1816e75eb379d06cfcd0af01e07a2eb813ae9b5d7405.svg'
            alt='logo'
          />
        </div>
      </Link>
      <form action='' onSubmit={onSubmit} className={s.header_searchForm}>
        <input
          className={s.header_input}
          type='search'
          value={inputValue}
          onChange={onChange}
          placeholder='search photo'
          id='unsplash'
        />
        <button className={s.header_button}>
          <img src={searchSVG} alt='' />
        </button>
      </form>
      <div className={s.header_user}>
        <div className={s.header_userInfo}>
          <div className={s.header_userInfo__name}>{links()}</div>
          <div className={s.header_userInfo__logo}>
            {user ? <img src={user.profile_image.small} alt='' /> : null}
          </div>
        </div>

        <div className={s.header_menuToggle} onClick={onClickBurger}>
          <div className={s.header_menuToggle__burger}></div>
        </div>
        <div className={headerMenu}>
          <ul className={s.header_list}>
            <Link to={`user/${user ? user.username : null}`}>
              <li className={s.header_link}>View profile</li>
            </Link>
            <li className={s.header_link}>Account settings</li>
            <hr className={s.header_line} />
            <li className={s.header_link}>
              Logout @{user ? user.username : null}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export { Header };
