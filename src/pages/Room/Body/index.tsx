import React from 'react';
import StoriesContainer from './StoriesContainer';
import BoardContainer from './BoardContainer';
import style from './style.module.scss';

interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface Props {
  stories: Story[];
  currentStory?: Story;
  className?: string;
  canBeRevealed?: boolean;
}

const Body: React.FC<Props> = ({
  stories,
  currentStory,
  className = '',
  canBeRevealed = false,
}) => {
  return (
    <div className={`${style.body} ${className}`}>
      <StoriesContainer stories={stories} />
      <BoardContainer
        currentStory={currentStory}
        canBeRevealed={canBeRevealed}
      />
    </div>
  );
};

export default Body;
