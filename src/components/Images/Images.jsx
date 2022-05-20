import React from 'react';
import s from './Images.module.scss';
import { Card } from '../Card';

const Content = ({ cols }) => {
  return (
    <div className={s.content}>
      {cols.map((column, i) => (
        <div
          className={s.column}
          style={{ width: `${100 / cols.length}%` }}
          key={`column-${i}`}
        >
          {column.map((image) => (
            <div id={image.id} key={image.id} className={s.gridItem}>
              <Card
                key={image.id}
                id={image.id}
                image={image.urls.small}
                height={image.height}
                author={image.user.name}
                authorPhoto={image.user.profile_image.small}
                liked_by_user={image.liked_by_user}
              />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
const createDataModel = (images, cols) => {
  const result = [];

  for (let i = 0; i < cols; i++) {
    result.push([]);
  }
  let currentCol = 0;
  let i = 0;
  while (i < images.length) {
    const partial = images.slice(i, i + 1)[0];
    result[currentCol].push(partial);
    currentCol = currentCol < cols - 1 ? currentCol + 1 : 0;
    i++;
  }

  return result;
};

const Images = ({ images }) => {
  console.log(images, '>>>>>>>>>>>>>>>>>>>>>');
  const cols = createDataModel(images, 3);
  console.log(cols);
  return (
    <div className={s.root}>
      <Content {...{ cols }} />
    </div>
  );
};

export { Images };
