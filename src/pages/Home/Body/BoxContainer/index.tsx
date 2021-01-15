import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import Box from './Box';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { reactModalStyle } from '@scrpoker/constants/objects';
import { CHECK_ROOM, SUBMIT_JIRA_USER_CREDENTIALS } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';

interface Box {
  iconName: string;
  actionName: string;
  onClick: () => void;
}

interface IRoomStatus {
  isAvailable: boolean;
  errorMessage?: string;
}

interface Props {
  userRoomCode?: string;
  submitJiraUserCredentials: (data: IJiraUserCredentials) => Promise<void | boolean>;
  joinRoom: (roomCode: string) => Promise<void>;
}

const BoxContainer: React.FC<Props> = ({ userRoomCode, joinRoom, submitJiraUserCredentials }) => {
  const [joinRoomModalIsOpen, setIsJoinRoomModalOpen] = useState(false);
  const [integrationModalIsOpen, setIsIntegrationModalIsOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraDomain, setJiraDomain] = useState('');
  const [apiToken, setAPIToken] = useState('');
  const history = useHistory();

  const openJoinRoomModal = () => {
    setIsJoinRoomModalOpen(true);
  };

  const closeJoinRoomModal = () => {
    setIsJoinRoomModalOpen(false);
  };

  const openIntegrationModal = () => {
    setIsIntegrationModalIsOpen(true);
  };

  const closeIntegrationModal = () => {
    setIsIntegrationModalIsOpen(false);
  };

  const handleRoomCodeChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(value);
  };

  const handleJiraEmailChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setJiraEmail(value);
  };

  const handleJiraDomainChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setJiraDomain(value);
  };

  const handleAPITokenChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setAPIToken(value);
  };

  const join = async () => {
    const roomStatus: IRoomStatus = await fetch(CHECK_ROOM(roomCode)).then((response) => {
      if (response.ok) {
        return { isAvailable: true };
      } else {
        if (response.status === 404) {
          return { isAvailable: false, errorMessage: 'The room does not exist' };
        }
        return {
          isAvailable: false,
          errorMessage: 'The room is full now',
        };
      }
    });

    if (roomStatus.isAvailable) {
      await joinRoom(roomCode);
      history.push('/room/' + roomCode);
    } else {
      alert(roomStatus.errorMessage);
    }
  };

  const addJiraToken = async () => {
    const data = {
      jiraDomain,
      jiraEmail,
      apiToken,
    };

    if (jiraDomain && jiraEmail && apiToken) {
      const isSuccessful = await submitJiraUserCredentials(data);
      if (isSuccessful) {
        closeIntegrationModal();
      }
    } else {
      alert('Fields cannot be empty');
    }
  };

  const boxes: Box[] = [
    {
      iconName: 'house-user',
      actionName: 'Join your room',
      onClick: async () => {
        const roomStatus: IRoomStatus = await fetch(CHECK_ROOM(userRoomCode as string)).then((response) => {
          if (response.ok) {
            return { isAvailable: true };
          } else {
            if (response.status === 404) {
              return { isAvailable: false, errorMessage: 'The room does not exist' };
            }
            return {
              isAvailable: false,
              errorMessage: 'The room is full now',
            };
          }
        });

        if (roomStatus.isAvailable) {
          await joinRoom(userRoomCode as string);
          history.push('/room/' + userRoomCode);
        } else {
          alert(roomStatus.errorMessage);
        }
      },
    },
    {
      iconName: 'arrow-right',
      actionName: 'Join a room',
      onClick: () => {
        openJoinRoomModal();
      },
    },
    {
      iconName: 'compress-arrows-alt',
      actionName: 'Jira integration',
      onClick: () => {
        openIntegrationModal();
      },
    },
    {
      iconName: 'user-circle',
      actionName: 'Profile',
      onClick: () => {
        alert(`Yeah ^^`);
      },
    },
  ];

  return (
    <div className={style.boxContainer}>
      <ReactModal onRequestClose={closeJoinRoomModal} isOpen={joinRoomModalIsOpen} style={reactModalStyle}>
        <Typo type="h2">Join a room</Typo>
        <Input className={style.input} name="roomCode" placeholder="Room code" onTextChange={handleRoomCodeChange} />
        <div className={style.submit}>
          <Button onClick={join}>Submit</Button>
        </div>
      </ReactModal>
      <ReactModal onRequestClose={closeIntegrationModal} isOpen={integrationModalIsOpen} style={reactModalStyle}>
        <Typo type="h2">Integrate with Jira</Typo>
        <Input
          className={style.input}
          name="jiraEmail"
          placeholder="Enter your jira email"
          onTextChange={handleJiraEmailChange}
        />
        <Input
          className={style.input}
          name="jiraDomain"
          placeholder="Enter your jira domain"
          onTextChange={handleJiraDomainChange}
        />
        <Input
          className={style.input}
          name="apiToken"
          placeholder="Enter your API token"
          onTextChange={handleAPITokenChange}
        />
        <div className={style.submit}>
          <Button onClick={addJiraToken}>Submit</Button>
        </div>
      </ReactModal>
      {boxes.map((box, key) => (
        <Box
          className={style.box}
          key={key}
          iconName={box.iconName}
          actionName={box.actionName}
          onClick={box.onClick}
        />
      ))}
    </div>
  );
};

const mapStateToProps = ({ userData: { userRoomCode } }: IGlobalState) => {
  return {
    userRoomCode,
  };
};

const mapDispatchToProps = {
  joinRoom: Actions.roomActions.joinRoom,
  submitJiraUserCredentials: Actions.userActions.submitJiraUserCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxContainer);
