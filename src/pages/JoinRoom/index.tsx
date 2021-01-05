import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input, AvatarInput, Card } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';
import { connect } from 'react-redux';
import { CHECK_ROOM } from '@scrpoker/constants/apis';
import { getAuthHeader } from '@scrpoker/utils';
import CookieReader from 'js-cookie';

const USER_NAME = 'userName';
const ROOM_CODE = 'roomCode';

interface IRoomStatus {
  isAvailable: boolean;
  errorMessage?: string;
}
interface Props {
  authenticate: () => Promise<void>;
  changeName: (changeNameData: IChangeNameData) => Promise<void>;
  signUp: (data: ISignUpData) => Promise<void | boolean>;
  joinRoom: (roomCode: string) => Promise<void>;
  setIsTokenValid: (isValid: boolean) => void;
}

const JoinRoom: React.FC<Props> = ({ changeName, signUp, joinRoom, setIsTokenValid, authenticate }) => {
  const [userName, setUserName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const history = useHistory();

  const goBack = () => history.push('/welcome');

  const submit = async () => {
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
      if (userName) {
        try {
          if (getAuthHeader()) {
            switch (userName !== CookieReader.get('userName')) {
              case true:
                await changeName({ newName: userName });
                await joinRoom(roomCode);
                setIsTokenValid(true);
                history.push('/room/' + roomCode);
                break;
              case false:
                await authenticate();
                await joinRoom(roomCode);
                setIsTokenValid(true);
                history.push('/room/' + roomCode);
                break;
            }
          } else {
            await signUp({ userName });
            await joinRoom(roomCode);
            setIsTokenValid(true);
            history.push('/room/' + roomCode);
          }
        } catch (err) {
          console.log(err);
        }
      } else alert('Username cannot be empty');
    } else {
      alert(roomStatus.errorMessage);
    }
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
  changeName: Actions.userActions.changeName,
  authenticate: Actions.userActions.authenticate,
};

export default connect(null, mapDispatchToProps)(JoinRoom);
