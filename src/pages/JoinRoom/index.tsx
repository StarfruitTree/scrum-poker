import { Button, Icon, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '@scrpoker/contexts';
import { JOIN_ROOM } from '@scrpoker/constants/apis';

const JoinRoom: React.FC = () => {
  const userContext = useContext(UserContext);
  const history = useHistory();

  let userInfo = {
    host: '',
    description: '',
    roomCode: '',
  };

  const submit = async () => {
    const userData = new FormData();
    userData.append('username', userInfo.host);
    userData.append('roomCode', userInfo.roomCode);
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

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfo = { ...userInfo, host: event.target.value };
    userContext.username = event.target.value;
  };

  const roomCodeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfo = { ...userInfo, roomCode: event.target.value };
    userContext.roomCode = event.target.value;
  };

  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <div className={style.userPicture}>
          <Icon className={style.userIcon} name="user-circle" size="fa-3x" />
          <Icon className={style.cameraIcon} name="camera" size="fa-lg" />
        </div>
        <Input onTextChange={nameHandler} placeholder="Your name" />
        <Input onTextChange={roomCodeHandler} placeholder="Room's code" />
        <div className={style.buttonContainer}>
          <Button disabled={false} onclick={submit} type="primary">
            Join
          </Button>
          <Link to="/welcome">
            <Button disabled={false} type="secondary">
              Cancel
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
