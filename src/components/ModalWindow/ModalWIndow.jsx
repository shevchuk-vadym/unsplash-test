import React, { useContext, useState } from 'react';
import { ModalContext } from '../../contexts/ModalContext';
import s from './ModalWindow.module.scss';

const ModalWindow = (props) => {
  const { title, content } = props;
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
        <div className={s.modal_header}>{title}</div>
        <div className={s.modal_body}>
          <img src={content} alt='' />
        </div>
      </div>
    </div>
  );
};

export { ModalWindow };
