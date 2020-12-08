import React, { useEffect, useState } from 'react';
import StoriesContainer from './StoriesContainer';
import BoardContainer from './BoardContainer';
import style from './style.module.scss';
import { connect } from 'react-redux';
import { GET_STORY, GET_ROOM_STORIES } from '@scrpoker/constants/apis';
import { Actions } from '@scrpoker/store';
import CookieReader from 'js-cookie';

interface Props {
  className?: string;
  roomConnection: any;
  roomId: number;
  action: number;
  updateCurrentStory: (story: IStory) => IRoomAction;
}

interface StoryData {
  id: number;
}

const Body: React.FC<Props> = ({ roomConnection, roomId, action, updateCurrentStory, className = '' }) => {
  const [stories, setStories] = useState([] as IStory[]);

  const getStories = async () => {
    const response = await fetch(GET_ROOM_STORIES(roomId), {
      headers: {
        Authorization: `Bearer ${CookieReader.get('jwtToken')}`,
      },
    });
    const data = await response.json();
    setStories(data.stories);
  };

  const storyAddedCallback = async ({ id }: StoryData) => {
    const response = await fetch(`${GET_STORY}/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieReader.get('jwtToken')}`,
      },
    });
    const data = await response.json();

    if (response.status === 404) {
      console.log(data.error);
    } else {
      setStories([...stories, { id, title: data.title, content: data.content }]);
    }
  };

  const currentStoryChangedCallback = ({ id }: StoryData) => {
    const story = stories.find((s) => s.id === id);
    updateCurrentStory(story as IStory);
  };

  useEffect(() => {
    roomConnection.off('storyAdded');
    roomConnection.on('storyAdded', storyAddedCallback);
  }, [storyAddedCallback]);

  useEffect(() => {
    roomConnection.off('currentStoryChanged');
    roomConnection.on('currentStoryChanged', currentStoryChangedCallback);
  }, [currentStoryChangedCallback]);

  useEffect(() => {
    if (action === 0) {
      getStories();
    }
  }, []);

  return (
    <div className={`${style.body} ${className}`}>
      <StoriesContainer stories={stories} />
      <BoardContainer className={style.boardContainer} />
    </div>
  );
};

const mapStateToProps = ({ roomData: { roomConnection, roomId }, userData: { action } }: IGlobalState) => {
  return {
    roomConnection,
    roomId,
    action,
  };
};

const mapDispatchToProps = {
  updateCurrentStory: Actions.roomActions.updateCurrentStory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
