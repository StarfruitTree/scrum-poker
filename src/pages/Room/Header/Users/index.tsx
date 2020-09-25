import React from 'react';
import UserCard from './UserCard';
import style from './style.module.scss';

interface User {
  name: string;
  status: string;
  point?: number;
}

interface Props {
  users: User[];
  className?: string;
}

const Users: React.FC<Props> = ({ users, className = '' }) => {
  return (
    <div className={`${style.usersContainer} ${className}`}>
      {users.map((user, index) => (
        <UserCard
          key={index}
          name={user.name}
          status={user.status}
          point={user.point}
          className={style.userCard}
        />
      ))}
    </div>
  );
};

export default Users;
