import React from 'react';
import style from './style.module.scss';
import { Typo, Avatar } from '@scrpoker/components';

interface Props {
  title: string;
  assignee?: string;
  point?: number;
  className?: string;
  onClick?: (() => void) | undefined;
}

const Story: React.FC<Props> = ({ onClick, title, assignee, point, className = '' }) => {
  return (
    <div onClick={onClick} className={`${style.story} ${className} ${onClick !== undefined ? style.clickable : ''}`}>
      <Typo className={style.title}>{title}</Typo>
      <div className={style.details}>
        {point !== -1 ? <Typo className={style.point}>{point}</Typo> : ''}
        {assignee ? (
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
