import { Button, Icon, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

const JoinRoom: React.FC = () => {
  const history = useHistory();

  const [userInfo, setUserInfo] = useState({
    host: '',
    description: '',
    roomCode: '',
  });

  const submit = async () => {
    const userData = new FormData();
    userData.append('username', userInfo.host);
    userData.append('roomCode', userInfo.roomCode);

    try {
      const response = await fetch('https://localhost:44397/api/rooms/join', {
        method: 'post',
        body: userData,
      }).then((response) => response.json());
      history.push(`/room/${response.code}`);
    } catch (err) {
      console.log(err);
    }
  };

  const nameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, host: event.target.value });
  };

  const roomCodeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, roomCode: event.target.value });
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
          <Button onclick={submit} type="primary">
            Join
          </Button>
          <Link to="/welcome">
            <Button type="secondary">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;
