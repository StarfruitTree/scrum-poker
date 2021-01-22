import React from 'react';
import { Button } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { SUBMIT_POINT, SUBMIT_JIRA_POINT } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';

interface Props {
  className?: string;
  currentStory: IStory | undefined;
  roomCode: string;
  roomConnection: any;
  point: number;
  currentStoryPoint: number;
  role?: number;
  users: IUser[];
  submittedUsers: number;
  isLocked: boolean;
  roomState: string;
  updateIsLocked: (isLocked: boolean) => IRoomAction;
  jiraDomain?: string;
  jiraToken?: string;
}

const ControlPanel: React.FC<Props> = ({
  users,
  submittedUsers,
  roomConnection,
  point,
  currentStoryPoint,
  role,
  roomState,
  roomCode,
  isLocked,
  currentStory,
  jiraDomain,
  jiraToken,
  updateIsLocked,
  className = '',
}) => {
  console.log(point);

  const currentStoryIsPicked = currentStory ? true : false;

  const submitPoint = async () => {
    const submitPointData = {
      storyId: currentStory?.id,
      point,
      isFinalPoint: false,
    };
    fetch(SUBMIT_POINT, {
      method: 'POST',
      body: JSON.stringify(submitPointData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader() as string,
      },
    });
  };

  const submitPointForJiraStory = async () => {
    const storyData = {
      storyId: currentStory?.id,
      point: currentStoryPoint,
      isFinalPoint: true,
    };

    await fetch(SUBMIT_POINT, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader() as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(storyData),
    });

    roomConnection.send('UpdateStory', roomCode, currentStory?.id);

    const jiraStoryData = {
      issueId: currentStory?.jiraIssueId,
      jiraToken,
      jiraDomain,
      point: currentStoryPoint,
    };

    const response = await fetch(SUBMIT_JIRA_POINT, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader() as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jiraStoryData),
    });

    if (response.status === 401) {
      alert(`The point hasn't been submitted on Jira yet because your Jira token has been revoked.`);
    }
  };

  const submitFinalPoint = async () => {
    const submitPointData = {
      storyId: currentStory?.id,
      point: currentStoryPoint,
      isFinalPoint: true,
    };
    fetch(SUBMIT_POINT, {
      method: 'POST',
      body: JSON.stringify(submitPointData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: getAuthHeader() as string,
      },
    });
  };

  return (
    <div className={`${style.controlPanel} ${className}`}>
      {role === 0 ? (
        roomState === 'waiting' ? (
          <Button
            className={style.button}
            onClick={() => {
              roomConnection.send('ChangeRoomState', roomCode, 'playing');
            }}
            disabled={!currentStoryIsPicked}
          >
            Start
          </Button>
        ) : roomState === 'playing' ? (
          <React.Fragment>
            <Button
              className={style.button}
              disabled={point === -1 || isLocked ? true : false}
              onClick={async () => {
                roomConnection.send('ChangeUserStatus', roomCode, 'ready', point);
                updateIsLocked(true);
                submitPoint();
              }}
            >
              Lock
            </Button>
            <Button
              className={style.button}
              disabled={users.length !== submittedUsers}
              onClick={() => {
                roomConnection.send('ChangeRoomState', roomCode, 'revealed');
              }}
            >
              Reveal
            </Button>
          </React.Fragment>
        ) : (
          <Button
            className={style.button}
            onClick={
              jiraToken
                ? async () => {
                    roomConnection.send('ChangeRoomState', roomCode, 'waiting');
                    roomConnection.send('ChangeCurrentStory', roomCode, -1);
                    submitPointForJiraStory();
                  }
                : async () => {
                    roomConnection.send('ChangeRoomState', roomCode, 'waiting');
                    roomConnection.send('ChangeCurrentStory', roomCode, -1);
                    if (currentStoryPoint !== -1) {
                      await submitFinalPoint();
                      roomConnection.send('UpdateStory', roomCode, currentStory?.id);
                    }
                  }
            }
            disabled={false}
          >
            Done
          </Button>
        )
      ) : roomState === 'waiting' || roomState === 'revealed' ? (
        <React.Fragment />
      ) : (
        <Button
          className={style.button}
          disabled={point === -1 || isLocked ? true : false}
          onClick={() => {
            roomConnection.send('ChangeUserStatus', roomCode, 'ready', point);
            updateIsLocked(true);
            submitPoint();
          }}
        >
          Lock
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = ({
  roomData: {
    roomCode,
    roomState,
    roomConnection,
    point,
    currentStoryPoint,
    isLocked,
    currentStory,
    users,
    submittedUsers,
    role,
  },
  userData: { jiraToken, jiraDomain },
}: IGlobalState) => {
  return {
    roomCode,
    roomState,
    roomConnection,
    point,
    currentStoryPoint,
    isLocked,
    currentStory,
    role,
    users,
    submittedUsers,
    jiraDomain,
    jiraToken,
  };
};

const mapDispatchToProps = {
  updateIsLocked: Actions.roomActions.updateIsLocked,
};

export default connect(mapStateToProps, mapDispatchToProps)(ControlPanel);
