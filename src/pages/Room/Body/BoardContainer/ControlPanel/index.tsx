import React, { useState } from 'react';
import { Button, Typo } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { SUBMIT_POINT, SUBMIT_JIRA_POINT } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';
import ReactModal from 'react-modal';
import { reactWarningModalStyle } from '@scrpoker/constants/objects';

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
  const [is401ModalOpen, setIs401ModalOpen] = useState(false);

  const [is400ModalOpen, setIs400ModalOpen] = useState(false);

  const open401Modal = () => {
    setIs401ModalOpen(true);
  };

  const close401Modal = () => {
    setIs401ModalOpen(false);
  };

  const open400Modal = () => {
    setIs400ModalOpen(true);
  };

  const close400Modal = () => {
    setIs400ModalOpen(false);
  };

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

    fetch(SUBMIT_JIRA_POINT, {
      method: 'POST',
      headers: {
        Authorization: getAuthHeader() as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(jiraStoryData),
    }).then((response) => {
      if (response.status === 401) {
        open401Modal();
      } else if (response.status === 400) {
        open400Modal();
      }
    });
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
      <ReactModal
        closeTimeoutMS={100}
        onRequestClose={close401Modal}
        isOpen={is401ModalOpen}
        style={reactWarningModalStyle}
      >
        <div className={style.description}>
          <Typo>The point is not submitted on Jira because your Jira token has been revoked</Typo>
          <div>
            <Button className={style.okButton} onClick={close400Modal}>
              Ok
            </Button>
          </div>
        </div>
      </ReactModal>
      <ReactModal closeTimeoutMS={100} isOpen={is400ModalOpen} style={reactWarningModalStyle}>
        <div className={style.description}>
          <div>
            <Typo>
              The point is not submitted on Jira because you have not enabled the default screen of the project or this
              ticket does not associate with points
            </Typo>
          </div>
          <div className={style.explanation}>
            <Typo>
              You need to enable the default scrren or all the screens with the url:{' '}
              <Typo type="span" className={style.url}>
                https://{jiraDomain}
                /secure/admin/AssociateFieldToScreens!default.jspa?fieldId=customfield_10026
              </Typo>
            </Typo>
          </div>
        </div>
      </ReactModal>
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
              currentStory?.isJiraStory
                ? async () => {
                    roomConnection.send('ChangeRoomState', roomCode, 'waiting');
                    roomConnection.send('ChangeCurrentStory', roomCode, -1);
                    await submitPointForJiraStory();
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
