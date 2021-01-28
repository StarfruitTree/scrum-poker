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

const BoardContainer: React.FC<Props> = ({ className }) => {
  return (
    <div className={`${style.boardContainer} ${className}`}>
      <Board className={style.board} />
      <ControlPanel />
    </div>
  );
};

export default BoardContainer;
