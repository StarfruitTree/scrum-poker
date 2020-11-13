import React, { useContext, useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import style from './style.module.scss';
import { Typo, Icon, Input, Button } from '@scrpoker/components';
import { UserContext } from '@scrpoker/contexts';
import { ADD_STORY } from '@scrpoker/constants/apis';
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
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

const StoriesContainer: React.FC<Props> = ({ stories }) => {
  const { roomCode, roomConnection, roomState, userRole } = useContext(UserContext);

  const [modalIsOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const [story, setStory] = useState({
    roomCode: roomCode,
    title: '',
    content: '',
  });

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStory({ ...story, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory({ ...story, content: event.target.value });
  };

  const submit = async () => {
    const storyData = new FormData();
    storyData.append('roomCode', roomCode);
    storyData.append('title', story.title);
    storyData.append('content', story.content);

    try {
      const response = await fetch(ADD_STORY, {
        method: 'post',
        body: storyData,
      });

      const data = await response.json();

      if (response.status === 422) {
        console.log('Error');
      } else {
        roomConnection.send('AddStory', roomCode, data.id);
      }
    } catch (err) {
      console.log(err);
    } finally {
      closeModal();
    }
  };

  return (
    <div className={style.storiesContainer}>
      <ReactModal onRequestClose={closeModal} isOpen={modalIsOpen} style={modalStyle}>
        <Typo type="h2">Add a story</Typo>
        <Input placeholder="Story's title" onTextChange={handleTitleChange} />
        <textarea
          className={style.textarea}
          rows={8}
          cols={40}
          placeholder="Story's content"
          onChange={handleContentChange}
        />
        <div className={style.submit}>
          <Button onClick={submit}>Submit</Button>
        </div>
      </ReactModal>
      <div className={style.firstColumn}>
        <Typo type="h3">Stories</Typo>
        {userRole === 0 ? (
          <Icon
            onClick={roomState === 'waiting' ? openModal : undefined}
            name="plus"
            size="lg"
            className={style.icon}
          />
        ) : (
          ''
        )}
      </div>
      <div className={style.stories}>
        {stories.map((s) => (
          <Story
            onClick={
              roomState === 'waiting' && userRole === 0
                ? () => {
                    roomConnection.send('ChangeCurrentStory', roomCode, s.id);
                  }
                : undefined
            }
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
