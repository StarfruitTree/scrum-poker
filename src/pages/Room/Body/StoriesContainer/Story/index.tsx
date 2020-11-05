import React from 'react';
import style from './style.module.scss';
import { Typo } from '@scrpoker/components';
import Avatar from '../../../Header/UsersContainer/UserCard/Avatar';

interface Props {
  title: string;
  assignee?: string;
  point?: number;
  className?: string;
}

const Story: React.FC<Props> = ({ title, assignee, point, className = '' }) => {
  return (
    <div className={`${style.story} ${className}`}>
      <Typo className={style.title}>{title}</Typo>
      <div className={style.details}>
        {point !== undefined ? (
          <Typo className={style.point}>{point}</Typo>
        ) : (
          ''
        )}
        {assignee !== undefined ? (
          <div className={style.assignee}>
            <Avatar letter={assignee[0]} />
            <Typo type="span">{assignee}</Typo>
          </div>
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Story;
