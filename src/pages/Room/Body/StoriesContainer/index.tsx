import React, { useState } from 'react';
import ReactModal from 'react-modal';
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

const modalStyle = {
  content: {
    top: '30%',
    left: '30%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
  },
};

const StoriesContainer: React.FC<Props> = ({ stories }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  return (
    <div className={style.storiesContainer}>
      <ReactModal isOpen={modalIsOpen} style={modalStyle} />
      <div className={style.firstColumn}>
        <Typo>Stories</Typo>
        <Icon onClick={openModal} name="plus" size="lg" className={style.icon} />
      </div>
      <div className={style.stories}>
        {stories.map((s) => (
          <Story key={s.id} title={s.title} assignee={s.assignee} point={s.point} className={style.story} />
        ))}
      </div>
    </div>
  );
};

export default StoriesContainer;
