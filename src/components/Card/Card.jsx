import React, { useContext } from 'react';
import s from './Card.module.scss';
import addPhoto from '../assets/plus-svgrepo-com.svg';
import likePhotoSVG from '../assets/like-svgrepo-com.svg';
import downloadPhoto from '../assets/download-svgrepo-com.svg';
import { Link } from 'react-router-dom';
import { ModalContext } from '../../contexts/ModalContext';

const Card = ({ id, image, author, authorPhoto, imageMedium, user }) => {
  const { openModal } = useContext(ModalContext);
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
  const handleClickonOnPhoto = () => {
    openModal({
      author: author,
      authorImg: authorPhoto,
      content: imageMedium,
    });
  };
  return (
    <div className={s.image}>
      <img className={s.img} src={image} alt='photo' />
      <div className={s.link} onClick={handleClickonOnPhoto}></div>
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
          <Link className={s.author} to={`/user/${user.username}`}>
            <div className={s.author_image}>
              <img src={authorPhoto} alt='' />
            </div>
            <h4>{author}</h4>
          </Link>
          <div className={s.download}>
            <img src={downloadPhoto} alt='' />
          </div>
        </div>
      </div>
    </div>
  );
};

export { Card };
