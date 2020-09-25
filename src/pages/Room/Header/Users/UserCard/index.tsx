import Avatar from './Avatar';
import Card from './Card';
import { Typo } from '@scrpoker/components';
import React from 'react';
import style from './style.module.scss';

interface Props {
  name: string;
  status: string;
  point?: number;
  className?: string;
}

const UserCard: React.FC<Props> = ({ name, status, point, className = '' }) => {
  return (
    <div className={`${style.userCard} ${className}`}>
      <Card status={status} point={point} />
      <Avatar className={style.avatar} letter={name[0]} />
      <Typo className={style.username}>{name}</Typo>
    </div>
  );
};

export default UserCard;
