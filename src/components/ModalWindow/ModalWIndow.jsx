import React, { useContext, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import s from './ModalWindow.module.scss';
import addPhoto from '../assets/plus-svgrepo-com.svg';
import likePhotoSVG from '../assets/like-svgrepo-com.svg';

const ModalWindow = (props) => {
  const { author, authorImg, content, render } = props;
  const { closeModal } = useContext(ModalContext);
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);

    const closeTimeOut = setTimeout(() => {
      closeModal();
      clearTimeout(closeTimeOut);
    }, 300);
  };

  const backdropClasses = close
    ? `${s.backdrop} ${s.backdrop_hide}`
    : `${s.backdrop}`;
  return (
    <div className={backdropClasses} onClick={handleClose}>
      <div className={s.modal}>
        <div className={s.modal_header}>
          <div className={s.info}>
            <div className={s.author_image}>
              <img src={authorImg} alt='' />
            </div>
            <div className={s.info_author}>
              <h4>{author}</h4>
            </div>
          </div>
          <div className={s.icons}>
            <div className={s.like}>
              <img src={likePhotoSVG} alt='' />
            </div>
            <div className={s.add}>
              <img src={addPhoto} alt='' />
            </div>
            <div className={s.download}>
              <span>Download</span>
            </div>
          </div>
        </div>
        <div className={s.modal_body}>
          <img src={content} alt='' />
        </div>
        {/* {render
          ? render()
          : () => (
              <div className={s.modal_body}>
                <img src={content} alt='' />
              </div>
            )} */}
      </div>
    </div>
  );
};

export { ModalWindow };
