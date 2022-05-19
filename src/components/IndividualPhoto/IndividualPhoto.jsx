import React from 'react';
import s from './individualPhoto.module.scss';
import addPhoto from '../assets/plus-svgrepo-com.svg';
import likePhotoSVG from '../assets/like-svgrepo-com.svg';
import downloadPhoto from '../assets/download-svgrepo-com.svg';

const IndividualPhoto = ({
  id,
  image,
  height,
  author,
  liked_by_user,
  authorPhoto,
}) => {
  const divStyle = {
    height: height / 10,
  };
  const [like, settoLike] = React.useState();
  let t = null;
  function likePhoto() {
    const fetchAPILikes = async () => {
      const response = await fetch(
        `https://api.unsplash.com/photos/${id}/like`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer KLBMAGrljfTaZ8vyGEYSRZayTBp-NpPwO2pOeUY0O0U',
          },
        }
      );
      const data = await response.json();
      console.log(data);
      t = data;
      // settoLike(data);
    };
    // console.log(like);
    fetchAPILikes();
  }
  console.log(author);
  return (
    <div className={s.image} style={divStyle}>
      <img className={s.img} src={image} alt='photo' />
      <div className={s.block}>
        <div className={s.favorite}>
          <div className={s.like} onClick={likePhoto}>
            <img src={likePhotoSVG} alt='' />
          </div>
          <div className={s.add}>
            <img src={addPhoto} alt='' />
          </div>
        </div>
        <div className={s.info}>
          <div className={s.author}>
            <div className={s.author_image}>
              <img src={authorPhoto} alt='' />
            </div>
            <h4>{author}</h4>
          </div>
          <div className={s.download}>
            <img src={downloadPhoto} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export { IndividualPhoto };
