import React, { useState, useCallback } from 'react';

import searchSVG from '../assets/search-svgrepo-com.svg';

import s from './Header.module.scss';
const Header = ({ links, onSearch }) => {
  const [inputValue, setInputValue] = useState('');

  const onChange = useCallback((e) => setInputValue(e.target.value), []);
  const onSubmit = useCallback((e) => {
    e.preventDefault();
    onSearch(inputValue);
  });
  return (
    <div className={s.header}>
      <div className={s.header_logo}>
        <img
          src='https://unsplash.com/assets/core/logo-black-df2168ed0c378fa5506b1816e75eb379d06cfcd0af01e07a2eb813ae9b5d7405.svg'
          alt='logo'
        />
      </div>
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
          {links()} <div className={s.header_userInfo__logo}></div>
        </div>
        <div className={s.header_menuToggle}>
          <div className={s.header_menuToggle__burger}></div>
        </div>
      </div>
    </div>
  );
};

export { Header };
