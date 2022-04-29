import React from 'react';
import s from './Images.module.scss';
import { IndividualPhoto } from '../IndividualPhoto';

const Images = ({ images }) => {
  return (
    <div className={s.grid}>
      {images.map((image) => (
        <IndividualPhoto
          key={image.id}
          image={image.urls.small}
          height={image.height}
          author={image.user.name}
        />
      ))}
    </div>
  );
};

export { Images };
