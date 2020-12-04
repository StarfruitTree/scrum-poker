import React from 'react';
import Header from './Header';
import style from './style.module.scss';

const Home: React.FC = () => {
  return (
    <div className={style.homePage}>
      <Header />
    </div>
  );
};

export default Home;
