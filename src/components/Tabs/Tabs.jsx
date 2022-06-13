import { useState } from 'react';
import s from './Tabs.module.scss';

export const Tabs = ({ options }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className={s.root}>
      <div className={s.header}>
        {options.map((option, index) => {
          return (
            <button
              key={`tabs-option-${index}`}
              onClick={() => setActiveIndex(index)}
            >
              {option.title}
            </button>
          );
        })}
      </div>
      <div className={s.content}>
        {options.map((option, index) => {
          return (
            <div
              key={`tabs-option-${index}`}
              className={`${s.contentItem} ${
                activeIndex === index ? s.active : ''
              }`}
            >
              <>{option.componentToRender()}</>
            </div>
          );
        })}
      </div>
    </div>
  );
};
