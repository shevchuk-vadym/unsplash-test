import React from 'react';
import s from './individualPhoto.module.scss';

const IndividualPhoto = ({ image, height, author }) => {
  const divStyle = {
    height: height / 10,
  };
  return (
    <div className={s.image} style={divStyle}>
      <img className={s.img} src={image} alt='photo' />
      <div className={s.block}>
        <div className={s.favorite}>
          <div className={s.like}>like</div>
          <div className={s.add}>add</div>
        </div>
        <div className={s.info}>
          <div className={s.author}>
            <h4>{author}</h4>
          </div>
          <div className={s.download}>down</div>
        </div>
      </div>
    </div>
  );
};

export { IndividualPhoto };
