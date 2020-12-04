import React from 'react';
import style from './style.module.scss';
import { Typo, Icon } from '@scrpoker/components';
import Avatar from '@scrpoker/components/Avatar';

export interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface Props {
  story?: Story;
  className?: string;
}

const Board: React.FC<Props> = ({ story, className = '' }) => {
  return story !== undefined ? (
    <div className={`${style.board} ${className}`}>
      <div className={style.header}>
        <Typo className={style.title} type="h2">
          {story.title}
        </Typo>
        {story.point ? <Typo className={style.point}>{story.point}</Typo> : ''}
      </div>
      <div className={style.content}>
        <Typo type="span">{story.content}</Typo>
      </div>
      <div className={style.submit}>
        <div className={style.assign}>
          <Typo type="h3">Assignee</Typo>
          <Icon name="plus-circle" size="lg" className={style.icon} />
          {story.assignee ? (
            <div className={style.assignee}>
              <Avatar letter={story.assignee[0]} />
              <Typo>{story.assignee}</Typo>
            </div>
          ) : (
            ''
          )}
        </div>
        <div className={style.submitPoint}>
          <Typo type="h3">Point</Typo>
          <Icon name="plus-circle" size="lg" className={style.icon} />
          {story.point ? <Avatar className={style.customPoint} letter={story.point.toString()} /> : ''}
        </div>
      </div>
    </div>
  ) : (
    <div className={`${style.board} ${className}`}></div>
  );
};

export default Board;
