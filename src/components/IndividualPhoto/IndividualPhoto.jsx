import React from 'react';
import s from './individualPhoto.module.scss';

const IndividualPhoto = ({ id, image, height, author, liked_by_user }) => {
  const divStyle = {
    height: height / 10,
  };
  const [like, settoLike] = React.useState();
  let t = null
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
      t = data
      // settoLike(data);
    };
    // console.log(like);
    fetchAPILikes();
  }
  return (
    <div className={s.image} style={divStyle}>
      <img className={s.img} src={image} alt='photo' />
      <div className={s.block}>
        <div className={s.favorite}>
          <div className={s.like} onClick={likePhoto}>
            {liked_by_user ? 'liked!!!' : 'like'}
          </div>
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
