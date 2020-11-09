import React from 'react';
import Board from './Board';
import ControlPanel from './ControlPanel';
import style from './style.module.scss';

interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface Props {
  currentStory?: Story;
  className?: string;
}

const BoardContainer: React.FC<Props> = ({ currentStory, className }) => {
  return (
    <div className={`${style.boardContainer} ${className}`}>
      <Board story={currentStory} className={style.board} />
      <ControlPanel currentStoryIsPicked={currentStory !== undefined ? true : false} />
    </div>
  );
};

export default BoardContainer;
