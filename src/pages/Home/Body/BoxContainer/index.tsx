import React, { useState } from 'react';
import ReactModal from 'react-modal';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import Box from './Box';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { reactModalStyle } from '@scrpoker/constants/objects';

interface Box {
  iconName: string;
  actionName: string;
  onClick: () => void;
}

interface Props {
  userRoomCode?: string;
  joinRoom: (roomCode: string) => Promise<void>;
}

const BoxContainer: React.FC<Props> = ({ userRoomCode, joinRoom }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [roomCode, setRoomCode] = useState('');
  const history = useHistory();

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleRoomCodeChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setRoomCode(value);
  };

  const join = async () => {
    await joinRoom(roomCode);
    history.push('/room/' + roomCode);
  };

  const boxes: Box[] = [
    {
      iconName: 'house-user',
      actionName: 'Join your room',
      onClick: async () => {
        await joinRoom(userRoomCode as string);
        history.push('/room/' + userRoomCode);
      },
    },
    {
      iconName: 'arrow-right',
      actionName: 'Join a room',
      onClick: () => {
        openModal();
      },
    },
    {
      iconName: 'compress-arrows-alt',
      actionName: 'Integration',
      onClick: () => {
        alert(`Yeah ^^`);
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
      <ReactModal onRequestClose={closeModal} isOpen={modalIsOpen} style={reactModalStyle}>
        <Typo type="h2">Join a room</Typo>
        <Input className={style.input} name="roomCode" placeholder="Room code" onTextChange={handleRoomCodeChange} />
        <div className={style.submit}>
          <Button onClick={join}>Submit</Button>
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
};

export default connect(mapStateToProps, mapDispatchToProps)(BoxContainer);
