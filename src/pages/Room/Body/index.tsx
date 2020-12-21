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
  updateCurrentStoryPoint: (point: number) => IRoomAction;
}

interface IStoryData {
  id: number;
}

interface ICurrentStoryPointData {
  point: number;
}

const Body: React.FC<Props> = ({
  roomConnection,
  roomId,
  updateCurrentStory,
  updateCurrentStoryPoint,
  className = '',
}) => {
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

  const storyAddedCallback = async ({ id }: IStoryData) => {
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

  const storyUpdatedCallback = async ({ id }: IStoryData) => {
    const response = await fetch(`${GET_STORY}/${id}`, {
      headers: {
        Authorization: getAuthHeader(),
      },
    });

    const data = await response.json();

    if (response.status === 404) {
      console.log(data.error);
    } else {
      const updatedStories = stories.slice(0);
      updatedStories.forEach((s) => {
        if (s.id === data.id) {
          s.point = data.point;
        }
      });
      setStories(updatedStories);
    }
  };

  const currentStoryChangedCallback = ({ id }: IStoryData) => {
    const story = stories.find((s) => s.id === id);
    updateCurrentStory(story);
  };

  const currentStoryPointChangedCallback = ({ point }: ICurrentStoryPointData) => {
    updateCurrentStoryPoint(point);
  };

  useEffect(() => {
    roomConnection.off('storyAdded');
    roomConnection.on('storyAdded', storyAddedCallback);
  }, [storyAddedCallback]);

  useEffect(() => {
    roomConnection.off('storyUpdated');
    roomConnection.on('storyUpdated', storyUpdatedCallback);
  }, [storyUpdatedCallback]);

  useEffect(() => {
    roomConnection.off('currentStoryChanged');
    roomConnection.on('currentStoryChanged', currentStoryChangedCallback);
  }, [currentStoryChangedCallback]);

  useEffect(() => {
    roomConnection.off('currentStoryPointChanged');
    roomConnection.on('currentStoryPointChanged', currentStoryPointChangedCallback);
  }, [currentStoryPointChangedCallback]);

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
  updateCurrentStoryPoint: Actions.roomActions.updateCurrentStoryPoint,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
