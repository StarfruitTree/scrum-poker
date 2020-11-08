import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { UserContext } from '@scrpoker/contexts';
import { JOIN_ROOM } from '@scrpoker/constants/apis';
import { Button, Typo, Input, AvatarInput, Card } from '@scrpoker/components';
import style from './style.module.scss';

const HOST_NAME = 'hostName';
const ROOM_CODE = 'roomCode';

const JoinRoom: React.FC = () => {
  const [hostName, setHostName] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const userContext = useContext(UserContext);
  const history = useHistory();

  const goBack = () => history.goBack();

  const submit = async () => {
    const userData = new FormData();
    userData.append('username', hostName);
    userData.append('roomCode', roomCode);
    userContext.action = 'join';
    userContext.userRole = 1;
    try {
      const response = await fetch(JOIN_ROOM, {
        method: 'post',
        body: userData,
      });

      const data = await response.json();

      if (response.status == 406) {
        alert(data.error);
      } else {
        console.log(data);
        userContext.roomName = data.roomName;
        userContext.description = data.description;
        history.push(`/room/${data.code}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case HOST_NAME:
        userContext.username = value;
        setHostName(value);
        break;
      default:
        userContext.roomCode = value;
        setRoomCode(value);
    }
  };

  return (
    <div className={style.container}>
      <Card width={450}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <AvatarInput className={style.avatar} />
        <Input name={HOST_NAME} onTextChange={handleTextChange} placeholder="Your name" />
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

export default JoinRoom;
