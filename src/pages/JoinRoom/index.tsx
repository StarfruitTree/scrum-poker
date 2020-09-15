import { Button, Icon, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import React from 'react';
import { Link } from 'react-router-dom';

const JoinRoom: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <div className={style.userPicture}>
          <Icon className={style.userIcon} name="user-circle" size="fa-3x" />
          <Icon className={style.cameraIcon} name="camera" size="fa-lg" />
        </div>
        <Input placeholder="Your name" />
        <Input placeholder="Room's code" />
        <div className={style.buttonContainer}>
          <Button type="primary">Join</Button>
          <Link to="/welcome">
            <Button type="secondary">Cancel</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default JoinRoom;