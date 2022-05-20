import React from 'react';

import searchSVG from '../assets/search-svgrepo-com.svg';

import s from './Header.module.scss';
const Header = ({ searchPhoto, inputValue, setInputValue, links }) => {
  return (
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
