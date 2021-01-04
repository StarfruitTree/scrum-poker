import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input, AvatarInput, Card } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';

const USER_NAME = 'userName';
const ROOM_CODE = 'roomCode';

interface Props {
  signUp: (data: ISignUpData) => Promise<void | boolean>;
  joinRoom: (roomCode: string) => Promise<void>;
  setIsTokenValid: (isValid: boolean) => void;
}

const JoinRoom: React.FC<Props> = ({ signUp, joinRoom, setIsTokenValid }) => {
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const history = useHistory();

  const goBack = () => history.push('/welcome');

  const submit = async () => {
    if (userName) {
      const userData: ISignUpData = {
        userName: userName,
      };

      try {
        await signUp(userData);
        await joinRoom(roomCode);
        setIsTokenValid(true);
        history.push('/room/' + roomCode);
      } catch (err) {
        console.log(err);
      }
    } else alert('Username cannot be empty');
  };

  const handleTextChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case USER_NAME:
        setUserName(value);
        break;
      default:
        setRoomCode(value);
    }
  };

  return (
    <div className={style.container}>
      <Card width={450}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <AvatarInput className={style.avatar} />
        <Input name={USER_NAME} onTextChange={handleTextChange} placeholder="Your name" />
        <Input name={ROOM_CODE} onTextChange={handleTextChange} placeholder="Room's code" />
        <Button fullWidth onClick={submit}>
          Join
        </Button>
        <Button fullWidth secondary onClick={goBack}>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

const mapDispatchToProps = {
  signUp: Actions.userActions.signUp,
  joinRoom: Actions.roomActions.joinRoom,
};

export default connect(null, mapDispatchToProps)(JoinRoom);
