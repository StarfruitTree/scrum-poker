import React from 'react';
import UserCard from './UserCard';
import style from './style.module.scss';

interface User {
  name: string;
  status: string;
  point?: number;
  role: number;
}

interface Props {
  users: User[];
  className?: string;
}

const UsersContainer: React.FC<Props> = ({ users, className = '' }) => {
  return (
    <div className={`${style.usersContainer} ${className}`}>
      {users.map((user) => (
        <UserCard
          key={user.name}
          name={user.name}
          status={user.status}
          point={user.point}
          role={user.role}
          className={style.userCard}
        />
      ))}
    </div>
  );
};

export default UsersContainer;
