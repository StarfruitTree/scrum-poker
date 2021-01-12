import React, { useState } from 'react';
import ReactModal from 'react-modal';
import style from './style.module.scss';
import { Typo, Icon, Input, Button } from '@scrpoker/components';
import { ADD_STORY } from '@scrpoker/constants/apis';
import { reactModalStyle } from '@scrpoker/constants/objects';
import Story from './Story';
import { connect } from 'react-redux';
import { getAuthHeader } from '@scrpoker/utils';

interface Props {
  stories: IStory[];
  roomId?: number;
  roomCode: string;
  roomConnection: any;
  roomState: string;
  role?: number;
}

const StoriesContainer: React.FC<Props> = ({ stories, roomId, roomCode, roomConnection, roomState, role }) => {
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
    const storyData = {
      roomId,
      title: story.title,
      content: story.content,
      isJiraStory: false,
    };

    try {
      const response = await fetch(ADD_STORY, {
        method: 'post',
        body: JSON.stringify(storyData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: getAuthHeader() as string,
        },
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
      <ReactModal onRequestClose={closeModal} isOpen={modalIsOpen} style={reactModalStyle}>
        <Typo type="h2">Add a story</Typo>
        <Input className={style.input} name="Title" placeholder="Story's title" onTextChange={handleTitleChange} />
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
        {role === 0 ? (
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
              roomState === 'waiting' && role === 0
                ? () => {
                    roomConnection.send('ChangeCurrentStory', roomCode, s.id);
                  }
                : undefined
            }
            key={s.id}
            title={s.title}
            assignee={s.assignee}
            point={s.point}
            isJiraStory={s.isJiraStory}
            className={style.story}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({ roomData: { roomId, roomCode, roomConnection, roomState, role } }: IGlobalState) => {
  return {
    roomId,
    roomCode,
    roomConnection,
    roomState,
    role,
  };
};

export default connect(mapStateToProps)(StoriesContainer);
