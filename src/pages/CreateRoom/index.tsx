import { Button, Icon, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import React, { useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { UserContext } from '@scrpoker/contexts';
const CreateRoom: React.FC = () => {
  const context = useContext(UserContext);

  const history = useHistory();

  let userInfo = {
    host: '',
    description: '',
    roomName: '',
  };

  const submit = async () => {
    const userData = new FormData();
    userData.append('hostName', userInfo.host);
    userData.append('description', userInfo.description);
    userData.append('roomName', userInfo.roomName);
    context.action = 'create';
    context.userRole = 0;
    context.roomState = 'waiting';
    try {
      const response = await fetch('https://localhost:5001/api/rooms/create', {
        method: 'post',
        body: userData,
      });

      const data = await response.json();

      if (response.status == 406) {
        alert(data.error);
      } else {
        context.roomCode = data.code;
        history.push(`/room/${data.code}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const hostNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfo = { ...userInfo, host: event.target.value };
    context.username = event.target.value;
  };

  const teamNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfo = { ...userInfo, roomName: event.target.value };
    context.roomName = event.target.value;
  };

  const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    userInfo = { ...userInfo, description: event.target.value };
    context.description = event.target.value;
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
        <Input onTextChange={hostNameHandler} placeholder="Your name" />
        <Input onTextChange={teamNameHandler} placeholder="Your team name" />
        <Input onTextChange={descriptionHandler} placeholder="Description" />
        <div className={style.buttonContainer}>
          <Button disabled={false} type="primary" onclick={submit}>
            Create
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

export default CreateRoom;
