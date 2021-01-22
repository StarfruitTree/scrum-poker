import React, { useState } from 'react';
import ReactModal from 'react-modal';
import style from './style.module.scss';
import { Typo, Icon, Input, Button } from '@scrpoker/components';
import { ADD_STORY, FETCH_JIRA_STORIES } from '@scrpoker/constants/apis';
import { reactModalStyle, jiraStoryModalStyle } from '@scrpoker/constants/objects';
import Story from './Story';
import { connect } from 'react-redux';
import { getAuthHeader, debounce } from '@scrpoker/utils';
import JiraStoriesTable from './JiraStoriesTable';

interface Props {
  jiraToken?: string;
  jiraDomain?: string;
  stories: IStory[];
  roomId?: number;
  roomCode: string;
  roomConnection: any;
  roomState: string;
  currentStory: IStory | undefined;
  role?: number;
  jiraIssueIds: string[];
}

interface IJiraStory {
  issueKey: string;
  summary: string;
  issueTypeLink: string;
}

interface IIssueResponse {
  id: number;
  img: string;
  key: string;
  summaryText: string;
}

const StoriesContainer: React.FC<Props> = ({
  jiraToken,
  jiraDomain,
  stories,
  currentStory,
  roomId,
  roomCode,
  roomConnection,
  roomState,
  role,
  jiraIssueIds,
}) => {
  const [fetching, setFetching] = useState(false);

  const [manualStoryModalIsOpen, setManualStoryModalIsOpen] = useState(false);

  const [navigateModalIsOpen, setNavigateModalIsOpen] = useState(false);

  const [jiraStoryModalIsOpen, setJiraStoryModalIsOpen] = useState(false);

  const [jiraIssueId, setJiraIssueId] = useState('');

  const [jiraStories, setJiraStories] = useState<IJiraStory[] | undefined>(undefined);

  const openJiraStoryModal = () => {
    setJiraStoryModalIsOpen(true);
  };

  const closeJiraStoryModal = () => {
    setJiraStoryModalIsOpen(false);
  };

  const openNavigateModal = () => {
    setNavigateModalIsOpen(true);
  };

  const closeNavigateModal = () => {
    setNavigateModalIsOpen(false);
  };

  const openManualStoryModal = () => {
    setManualStoryModalIsOpen(true);
  };
  const closeManualStoryModal = () => {
    setManualStoryModalIsOpen(false);
  };

  const requestOpenAddStoryModal = () => {
    if (jiraToken) {
      openNavigateModal();
    } else {
      openManualStoryModal();
    }
  };

  const [story, setStory] = useState({
    roomCode: roomCode,
    title: '',
    content: '',
  });

  const fetchJiraStories = async (query: string) => {
    const requestBody = {
      query,
      jiraDomain,
      jiraToken,
    };

    try {
      setFetching(true);
      const response = await fetch(FETCH_JIRA_STORIES, {
        method: 'POST',
        headers: {
          Authorization: getAuthHeader() as string,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      }).then((response) => response.json());

      if (response.status === 'Ok') {
        const jsonObject = JSON.parse(response.content);

        console.log(jsonObject);

        const issues = jsonObject.sections[0].issues as Array<IIssueResponse>;

        const jiraStories: IJiraStory[] = issues.map((s) => {
          return {
            issueKey: s.key,
            summary: s.summaryText,
            issueTypeLink: `https://${jiraDomain}/${s.img}`,
          };
        });
        setFetching(false);
        setJiraStories(jiraStories);

        console.log(jiraStories);
      } else {
        setJiraStories([]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStory({ ...story, title: event.target.value });
  };

  const handleContentChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setStory({ ...story, content: event.target.value });
  };

  const handleJiraIssueIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setJiraIssueId(event.target.value);
    const query = event.target.value;

    if (query) {
      debounce(() => {
        fetchJiraStories(query);
      }, 300);
    }
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
      closeManualStoryModal();
    }
  };

  return (
    <div className={style.storiesContainer}>
      <ReactModal
        closeTimeoutMS={100}
        onRequestClose={closeManualStoryModal}
        isOpen={manualStoryModalIsOpen}
        style={reactModalStyle}
      >
        <div className={style.lessMarginTitle}>
          <Typo type="h2">Add stories manually</Typo>
          <Icon className={style.closeButton} size="2x" name="window-close" onClick={closeManualStoryModal} />
        </div>
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
      <ReactModal
        closeTimeoutMS={100}
        onRequestClose={closeNavigateModal}
        isOpen={navigateModalIsOpen}
        style={reactModalStyle}
      >
        <div className={style.title}>
          <Typo type="h2">Add a story</Typo>
          <Icon className={style.closeButton} size="2x" name="window-close" onClick={closeNavigateModal} />
        </div>
        <Button
          className={style.longButton}
          onClick={() => {
            closeNavigateModal();
            openJiraStoryModal();
          }}
        >
          Add stories with Jira
        </Button>
        <Button
          className={style.longButton}
          onClick={() => {
            closeNavigateModal();
            openManualStoryModal();
          }}
        >
          Add stories manually
        </Button>
      </ReactModal>
      <ReactModal closeTimeoutMS={100} isOpen={jiraStoryModalIsOpen} style={jiraStoryModalStyle}>
        <div className={style.lessMarginTitle}>
          <Typo type="h2">Add stories with Jira</Typo>
          <Icon
            className={style.closeButton}
            size="2x"
            name="window-close"
            onClick={() => {
              closeJiraStoryModal();
              setTimeout(() => {
                setJiraStories(undefined);
              }, 100);
            }}
          />
        </div>
        <Input
          className={`${style.input} ${style.longInput}`}
          name="jiraIssueId"
          placeholder="Enter a Jira issue ID"
          onTextChange={handleJiraIssueIdChange}
        />
        <JiraStoriesTable
          roomConnection={roomConnection}
          roomCode={roomCode}
          roomId={roomId as number}
          jiraToken={jiraToken as string}
          jiraDomain={jiraDomain as string}
          jiraIssueIds={jiraIssueIds}
          fetching={fetching}
          stories={jiraStories}
          className={style.jiraStoriesTable}
        />
      </ReactModal>
      <div className={style.firstColumn}>
        <Typo type="h3">Stories</Typo>
        {role === 0 ? (
          <Icon
            onClick={roomState === 'waiting' ? requestOpenAddStoryModal : undefined}
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
            selected={s.id === currentStory?.id}
            title={s.title}
            assignee={s.assignee}
            point={s.point}
            isJiraStory={s.isJiraStory}
            jiraIssueId={s.jiraIssueId}
            className={style.story}
          />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = ({
  roomData: { roomId, roomCode, roomConnection, roomState, role, currentStory, jiraIssueIds },
  userData: { jiraToken, jiraDomain },
}: IGlobalState) => {
  return {
    roomId,
    roomCode,
    roomConnection,
    roomState,
    role,
    currentStory,
    jiraDomain,
    jiraToken,
    jiraIssueIds,
  };
};

export default connect(mapStateToProps)(StoriesContainer);
