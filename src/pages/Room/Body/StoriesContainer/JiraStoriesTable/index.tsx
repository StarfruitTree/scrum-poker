import { useState } from 'react';
import { Icon, Typo } from '@scrpoker/components';
import React from 'react';
import style from './style.module.scss';
import TableRow from './TableRow';
import { ADD_JIRA_STORY } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';

interface IJiraStory {
  issueKey: string;
  summary: string;
  issueTypeLink: string;
}

interface Props {
  className?: string;
  stories?: IJiraStory[];
  fetching: boolean;
  jiraIssueIds: string[];
  roomId: number;
  jiraToken: string;
  jiraDomain: string;
  roomConnection: any;
  roomCode: string;
}

interface IResponseData {
  storyId: number;
  issueId: string;
}

const JiraStoriesTable: React.FC<Props> = ({
  stories,
  fetching,
  jiraDomain,
  jiraToken,
  roomId,
  roomConnection,
  jiraIssueIds,
  className,
  roomCode,
}) => {
  const [fetchingStories, setFetchingStories] = useState<string[]>([]);

  const addJiraStory = async (issueId: string) => {
    const requestBody = {
      issueId,
      jiraDomain,
      jiraToken,
      roomId,
    };
    const response = await fetch(ADD_JIRA_STORY, {
      method: 'POST',
      body: JSON.stringify(requestBody),
      headers: { 'Content-Type': 'application/json', Authorization: getAuthHeader() },
    });

    if (response.status === 401) {
      alert(`Can't add Jira story because your Jira token has been revoked`);
    } else if (response.status === 403) {
      alert(`You've reached the limit of 20 stories, please delete before adding more`);
    } else {
      const data = (await response.json()) as IResponseData;
      roomConnection.send('AddStory', roomCode, data.storyId);
    }
  };

  return (
    <div className={className}>
      <div className={style.columnTypes}>
        <div className={style.issueType}>
          <Typo type="h4">Type</Typo>
        </div>
        <div className={style.issueKey}>
          <Typo type="h4">Key</Typo>
        </div>
        <div className={style.summary}>
          <Typo type="h4">Summary</Typo>
        </div>
      </div>
      {fetching ? (
        <div className={style.loading}>
          {' '}
          <Icon name="fas fa-circle-notch fa-spin" size="3x" />
        </div>
      ) : stories ? (
        <div className={style.tableRows}>
          {stories.map((s) => (
            <TableRow
              key={s.issueKey}
              issueKey={s.issueKey}
              issueTypeLink={s.issueTypeLink}
              storyState={
                jiraIssueIds.includes(s.issueKey)
                  ? 'added'
                  : fetchingStories.includes(s.issueKey)
                  ? 'adding'
                  : 'notAdded'
              }
              summary={s.summary}
              onclick={() => {
                const newFetchingStories = fetchingStories.slice();
                newFetchingStories.push(s.issueKey);
                setFetchingStories(newFetchingStories);
                addJiraStory(s.issueKey);
              }}
            />
          ))}
        </div>
      ) : (
        <div className={style.loading}>
          {' '}
          <Typo>Nothing here</Typo>
        </div>
      )}
    </div>
  );
};

export default JiraStoriesTable;
