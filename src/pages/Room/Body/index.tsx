import React, { useEffect, useState } from 'react';
import StoriesContainer from './StoriesContainer';
import BoardContainer from './BoardContainer';
import style from './style.module.scss';
import { connect } from 'react-redux';
import { GET_STORY, GET_ROOM_STORIES } from '@scrpoker/constants/apis';
import { Actions } from '@scrpoker/store';
import { getAuthHeader } from '@scrpoker/utils';
import { GlobalPoints } from '@scrpoker/utils/pointController';

interface Props {
  className?: string;
  roomConnection: any;
  roomId?: number;
  jiraIssueIds: string[];
  updateCurrentStory: (story: IStory | undefined) => IRoomAction;
  updateCurrentStoryPoint: (point: number) => IRoomAction;
  updateJiraIssueIds: (issueIds: string[]) => IRoomAction;
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
  jiraIssueIds,
  updateCurrentStory,
  updateCurrentStoryPoint,
  updateJiraIssueIds,
  className = '',
}) => {
  const [stories, setStories] = useState([] as IStory[]);

  const getStories = async () => {
    if (roomId) {
      const response = await fetch(GET_ROOM_STORIES(roomId), {
        headers: {
          Authorization: getAuthHeader(),
        },
      });
      const stories = (await response.json()).stories as IStory[];
      setStories(stories);

      const jiraIssueIds: string[] = [];

      stories.forEach((s) => {
        if (s.isJiraStory) {
          jiraIssueIds.push(s.jiraIssueId as string);
        }
      });

      updateJiraIssueIds(jiraIssueIds);
    }
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
      setStories([
        ...stories,
        {
          id,
          title: data.title,
          content: data.content,
          point: data.point,
          isJiraStory: data.isJiraStory,
          jiraIssueId: data.jiraIssueId,
          submittedPointByUsers: data.submittedPointByUsers,
        },
      ]);

      if (data.isJiraStory) {
        const newJiraIssueIds = jiraIssueIds.slice();
        newJiraIssueIds.push(data.jiraIssueId);
        updateJiraIssueIds(newJiraIssueIds);
      }
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
          s.submittedPointByUsers = data.submittedPointByUsers;
        }
      });
      setStories(updatedStories);
    }
  };

  const storyDeletedCallback = ({ id }: IStoryData) => {
    const newStories = stories.slice(0);
    const story = newStories.find((s) => s.id === id);

    if (story?.isJiraStory) {
      const newJiraIssueIds = jiraIssueIds.slice(0);
      const jiraIssueId = newJiraIssueIds.find((s) => s === story.jiraIssueId);
      newJiraIssueIds.splice(newJiraIssueIds.indexOf(jiraIssueId as string), 1);
      updateJiraIssueIds(newJiraIssueIds);
    }

    newStories.splice(newStories.indexOf(story as IStory), 1);
    setStories(newStories);
  };

  const currentStoryChangedCallback = ({ id }: IStoryData) => {
    const story = stories.find((s) => s.id === id);
    updateCurrentStory(story);
  };

  const currentStoryPointChangedCallback = ({ point }: ICurrentStoryPointData) => {
    GlobalPoints.pointer = GlobalPoints.points.indexOf(point) as number;
    updateCurrentStoryPoint(point);
  };

  useEffect(() => {
    roomConnection.off('storyAdded');
    roomConnection.on('storyAdded', storyAddedCallback);
  }, [storyAddedCallback]);

  useEffect(() => {
    roomConnection.off('storyDeleted');
    roomConnection.on('storyDeleted', storyDeletedCallback);
  }, [storyDeletedCallback]);

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
  }, [roomId]);

  return (
    <div className={`${style.body} ${className}`}>
      <StoriesContainer stories={stories} />
      <BoardContainer className={style.boardContainer} />
    </div>
  );
};

const mapStateToProps = ({ roomData: { roomConnection, roomId, jiraIssueIds } }: IGlobalState) => {
  return {
    roomConnection,
    roomId,
    jiraIssueIds,
  };
};

const mapDispatchToProps = {
  updateCurrentStory: Actions.roomActions.updateCurrentStory,
  updateCurrentStoryPoint: Actions.roomActions.updateCurrentStoryPoint,
  updateJiraIssueIds: Actions.roomActions.updateJiraIssueIds,
};

export default connect(mapStateToProps, mapDispatchToProps)(Body);
