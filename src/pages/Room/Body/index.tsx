import React, { useContext, useEffect, useState } from 'react';
import StoriesContainer from './StoriesContainer';
import BoardContainer from './BoardContainer';
import style from './style.module.scss';
import { UserContext } from '@scrpoker/contexts';
import { GET_STORY, GET_ROOM_STORIES } from '@scrpoker/constants/apis';

interface Story {
  id: number;
  title: string;
  content: string;
  assignee?: string;
  point?: number;
}

interface Props {
  className?: string;
}

interface StoryData {
  id: number;
}

const Body: React.FC<Props> = ({ className = '' }) => {
  const { roomConnection, roomId, action } = useContext(UserContext);
  const [stories, setStories] = useState([] as Story[]);
  const [currentStory, setCurrentStory] = useState<Story | undefined>(undefined);

  const getStories = async () => {
    const response = await fetch(GET_ROOM_STORIES(roomId));
    console.log(response);
    const data = await response.json();
    console.log(data);
    setStories(data.stories);
  };

  const storyAddedCallback = async ({ id }: StoryData) => {
    const response = await fetch(`${GET_STORY}/${id}`);
    const data = await response.json();

    if (response.status === 404) {
      console.log(data.error);
    } else {
      setStories([...stories, { id, title: data.title, content: data.content }]);
    }
  };

  const currentStoryChangedCallback = ({ id }: StoryData) => {
    const story = stories.find((s) => s.id === id);
    setCurrentStory(story);
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
    if (action === 'join') {
      getStories();
    }
  }, []);

  return (
    <div className={`${style.body} ${className}`}>
      <StoriesContainer stories={stories} />
      <BoardContainer className={style.boardContainer} currentStory={currentStory} />
    </div>
  );
};

export default Body;
