import { Avatar, Typo } from '@scrpoker/components';
import style from './style.module.scss';
import React from 'react';

const Header: React.FC = () => {
  const userName = 'An Pham';

  return (
    <div className={style.header}>
      <Avatar letter={userName[0]} className={style.avatar} />
      <div className={style.greeting}>
        <Typo type="h2">Hi {userName}, have a nice day!</Typo>
        <Typo className={style.signOut}>Sign out</Typo>
      </div>
    </div>
  );
};

export default Header;
