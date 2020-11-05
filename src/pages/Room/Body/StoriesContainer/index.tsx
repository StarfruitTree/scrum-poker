import React from 'react';
import style from './style.module.scss';
import { Typo, Icon } from '@scrpoker/components';
import Story from './Story';

interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface Props {
  stories: Story[];
}

const StoriesContainer: React.FC<Props> = ({ stories }) => {
  return (
    <div className={style.storiesContainer}>
      <div className={style.firstColumn}>
        <Typo>Stories</Typo>
        <Icon name="plus" size="lg" />
      </div>
      <div className={style.stories}>
        {stories.map((s) => (
          <Story
            key={s.id}
            title={s.title}
            assignee={s.assignee}
            point={s.point}
            className={style.story}
          />
        ))}
      </div>
    </div>
  );
};

export default StoriesContainer;
