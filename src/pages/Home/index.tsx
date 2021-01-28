import React from 'react';
import Header from './Header';
import Body from './Body';
import style from './style.module.scss';

const Home: React.FC = () => {
  return (
    <div className={style.homePage}>
      <Header />
      <Body className={style.body} />
    </div>
  );
};

export default Home;
