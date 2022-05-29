import React from 'react';
import style from './NotFound.module.scss'

const NotFoundComponent = () => {
  return (
    <h1 className={style.root}>
      <span>😒</span>
      <br />
      Не найдена страница
    </h1>
  );
};

export default NotFoundComponent;