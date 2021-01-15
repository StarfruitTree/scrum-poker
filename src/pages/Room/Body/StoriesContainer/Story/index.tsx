import React from 'react';
import style from './style.module.scss';
import { Typo, Avatar } from '@scrpoker/components';

interface Props {
  selected: boolean;
  title: string;
  assignee?: string;
  point?: number;
  isJiraStory: boolean;
  className?: string;
  onClick?: (() => void) | undefined;
}

const Story: React.FC<Props> = ({ onClick, selected, title, assignee, point, isJiraStory, className = '' }) => {
  return (
    <div
      onClick={onClick}
      className={`${style.story} ${className} ${onClick !== undefined ? style.clickable : ''} ${
        selected ? style.selected : ''
      }`}
    >
      <Typo className={style.title}>{title}</Typo>
      <div className={style.details}>
        {point !== -1 ? <Typo className={style.point}>{point}</Typo> : <Typo></Typo>}
        {assignee ? (
          <div className={style.assignee}>
            <Avatar letter={assignee[0]} />
            <Typo type="span">{assignee}</Typo>
          </div>
        ) : (
          ''
        )}
        {!isJiraStory ? (
          <img width={16} height={16} src="https://cdn.jsdelivr.net/npm/simple-icons@v4/icons/jira.svg" />
        ) : (
          ''
        )}
      </div>
    </div>
  );
};

export default Story;
