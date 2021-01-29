import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input, Icon } from '@scrpoker/components';
import style from './style.module.scss';
import Box from './Box';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { reactModalStyle, reactWarningModalStyle } from '@scrpoker/constants/objects';
import { CHECK_ROOM } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';

interface Box {
  iconName: string;
  actionName: string;
  onClick: () => void;
}

interface IJiraResponse {
  isSuccessful: boolean;
  data?: {
    error?: string;
    jiraToken?: string;
    jiraDomain?: string;
  };
}

interface IRoomStatus {
  isAvailable: boolean;
  errorMessage?: string;
}

interface Props {
  jiraToken?: string;
  integratedJiraDomain?: string;
  userRoomCode?: string;
  submitJiraUserCredentials: (data: IJiraUserCredentials) => Promise<void | IJiraResponse>;
  joinRoom: (roomCode: string) => Promise<void>;
}

const BoxContainer: React.FC<Props> = ({
  userRoomCode,
  jiraToken,
  integratedJiraDomain,
  joinRoom,
  submitJiraUserCredentials,
}) => {
  const [joinRoomModalIsOpen, setIsJoinRoomModalOpen] = useState(false);
  const [integrationModalIsOpen, setIsIntegrationModalIsOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const [jiraEmail, setJiraEmail] = useState('');
  const [jiraDomain, setJiraDomain] = useState('');
  const [apiToken, setAPIToken] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [domainWarningModal, setDomainWarningModal] = useState(false);
  const [tokenWarningModal, setTokenWarningModal] = useState(false);
  const [successModal, setSuccessModal] = useState(false);

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

  const showDomainWarningModal = () => {
    setDomainWarningModal(true);
  };

  const hideDomainWarningModal = () => {
    setDomainWarningModal(false);
  };

  const showTokenWarningModal = () => {
    setTokenWarningModal(true);
  };

  const hideTokenWarningModal = () => {
    setTokenWarningModal(false);
  };

  const showSuccessModal = () => {
    setSuccessModal(true);
  };

  const hideSuccessModal = () => {
    setSuccessModal(false);
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
    if (jiraDomain.length > 50 || (jiraToken as string).length > 50 || jiraEmail.length > 50) {
      alert(`'Fields can't be too long`);
    } else if (jiraEmail && jiraToken && jiraDomain) {
      setIsLoading(true);
      const data = {
        jiraDomain,
        jiraEmail,
        apiToken,
        roomCode: userRoomCode as string,
      };

      if (jiraDomain && jiraEmail && apiToken) {
        const responseStatus = (await submitJiraUserCredentials(data)) as IJiraResponse;
        setIsLoading(false);

        if (!responseStatus.isSuccessful) {
          if (responseStatus.data?.error === 'The domain is not valid') {
            showDomainWarningModal();
          } else {
            showTokenWarningModal();
          }
        } else {
          showSuccessModal();
          closeIntegrationModal();
        }
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
        const roomStatus: IRoomStatus = await fetch(CHECK_ROOM(userRoomCode as string), {
          headers: {
            Authorization: getAuthHeader() as string,
          },
        }).then((response) => {
          if (response.ok) {
            return { isAvailable: true };
          } else {
            if (response.status === 404) {
              return { isAvailable: false, errorMessage: 'The room does not exist' };
            } else if (response.status === 409) {
              return { isAvailable: false, errorMessage: `You are currently in this room` };
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
      <ReactModal
        closeTimeoutMS={100}
        onRequestClose={closeJoinRoomModal}
        isOpen={joinRoomModalIsOpen}
        style={reactModalStyle}
      >
        <div className={style.title}>
          <Typo type="h2">Join a room</Typo>
          <Icon className={style.closeButton} size="2x" name="window-close" onClick={closeJoinRoomModal} />
        </div>
        <Input
          className={`${style.input} ${style.roomCodeInput}`}
          name="roomCode"
          placeholder="Room code"
          onTextChange={handleRoomCodeChange}
        />
        <div className={style.submit}>
          {isLoading ? (
            <Button square={true} className={style.loadingBUtton} icon="fas fa-circle-notch fa-spin" />
          ) : (
            <Button square={true} onClick={join}>
              Submit
            </Button>
          )}
        </div>
      </ReactModal>
      <ReactModal closeTimeoutMS={100} isOpen={integrationModalIsOpen} style={reactModalStyle}>
        <div className={style.title}>
          <Typo type="h2">Integrate with Jira</Typo>
          <Icon className={style.closeButton} size="2x" name="window-close" onClick={closeIntegrationModal} />
        </div>
        {jiraToken ? <Typo className={style.jiraDomain}>Integrated Jira domain: {integratedJiraDomain}</Typo> : ''}
        <Input
          className={style.input}
          name="jiraEmail"
          placeholder="Enter your Jira email"
          onTextChange={handleJiraEmailChange}
        />
        <Input
          className={style.input}
          name="jiraDomain"
          placeholder="Enter your Jira domain (Eg. example.atlassian.net)"
          onTextChange={handleJiraDomainChange}
        />
        <Input
          className={style.input}
          name="apiToken"
          placeholder="Enter your API token"
          onTextChange={handleAPITokenChange}
        />

        <div className={style.submit}>
          {isLoading ? (
            <Button className={style.loadingButton} icon="fas fa-circle-notch fa-spin" />
          ) : (
            <Button onClick={addJiraToken}>Submit</Button>
          )}
        </div>
      </ReactModal>
      <ReactModal
        style={reactWarningModalStyle}
        isOpen={domainWarningModal}
        onRequestClose={hideDomainWarningModal}
        closeTimeoutMS={100}
      >
        <div className={style.description}>
          <Typo>The domain is not valid</Typo>
          <div>
            <Button className={style.okButton} onClick={hideDomainWarningModal}>
              Ok
            </Button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        style={reactWarningModalStyle}
        isOpen={tokenWarningModal}
        onRequestClose={hideTokenWarningModal}
        closeTimeoutMS={100}
      >
        <div className={style.description}>
          <Typo>The email or API token is not valid</Typo>
          <div>
            <Button className={style.okButton} onClick={hideTokenWarningModal}>
              Ok
            </Button>
          </div>
        </div>
      </ReactModal>
      <ReactModal
        style={reactWarningModalStyle}
        isOpen={successModal}
        onRequestClose={hideSuccessModal}
        closeTimeoutMS={100}
      >
        <div className={style.description}>
          <Typo>Added successfully</Typo>
          <div>
            <Button className={style.okButton} onClick={hideSuccessModal}>
              Ok
            </Button>
          </div>
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

const mapStateToProps = ({ userData: { userRoomCode, jiraDomain, jiraToken } }: IGlobalState) => {
  return {
    userRoomCode,
    integratedJiraDomain: jiraDomain,
    jiraToken,
  };
};

const mapDispatchToProps = {
  joinRoom: Actions.roomActions.joinRoom,
  submitJiraUserCredentials: Actions.userActions.submitJiraUserCredentials,
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxContainer);
