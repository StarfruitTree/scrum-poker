import React, { useEffect, useState } from 'react';
import StoriesContainer from './StoriesContainer';
import BoardContainer from './BoardContainer';
import style from './style.module.scss';
import { connect } from 'react-redux';
import { GET_STORY, GET_ROOM_STORIES } from '@scrpoker/constants/apis';
import { Actions } from '@scrpoker/store';
import { getAuthHeader } from '@scrpoker/utils';

interface Props {
  className?: string;
  roomConnection: any;
  roomId: number;
  updateCurrentStory: (story: IStory | undefined) => IRoomAction;
}

interface StoryData {
  id: number;
}

const Body: React.FC<Props> = ({ roomConnection, roomId, updateCurrentStory, className = '' }) => {
  const [stories, setStories] = useState([] as IStory[]);

  const getStories = async () => {
    const response = await fetch(GET_ROOM_STORIES(roomId), {
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    const data = await response.json();
    setStories(data.stories);
  };

  const storyAddedCallback = async ({ id }: StoryData) => {
    const response = await fetch(`${GET_STORY}/${id}`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });
    const data = await response.json();

    if (response.status === 404) {
      console.log(data.error);
    } else {
      setStories([...stories, { id, title: data.title, content: data.content, point: data.point }]);
    }
  };

  const currentStoryChangedCallback = ({ id }: StoryData) => {
    const story = stories.find((s) => s.id === id);
    updateCurrentStory(story);
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
    getStories();
  }, []);

  return (
    <div className={`${style.body} ${className}`}>
      <StoriesContainer stories={stories} />
      <BoardContainer className={style.boardContainer} />
    </div>
  );
};

const mapStateToProps = ({ roomData: { roomConnection, roomId } }: IGlobalState) => {
  return {
    roomConnection,
    roomId,
  };
};

const mapDispatchToProps = {
  updateCurrentStory: Actions.roomActions.updateCurrentStory,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
