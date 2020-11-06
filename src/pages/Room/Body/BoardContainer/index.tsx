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
}

const BoardContainer: React.FC<Props> = ({ currentStory }) => {
  return (
    <div className={style.boardContainer}>
      <Board story={currentStory} className={style.board} />
      <ControlPanel />
    </div>
  );
};

export default BoardContainer;
