import { Avatar, Typo } from '@scrpoker/components';
import style from './style.module.scss';
import React from 'react';
import { connect } from 'react-redux';

interface Props {
  userName: string;
}

const Header: React.FC<Props> = ({ userName }) => {
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

const mapStateToProps = ({ userData: { name } }: IGlobalState) => {
  return {
    userName: name,
  };
};

export default connect(mapStateToProps)(Header);
