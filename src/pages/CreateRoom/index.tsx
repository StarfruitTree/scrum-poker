import { Button, Icon, Typo, Input } from '@scrpoker/components';
import style from './style.module.scss';
import React from 'react';

const CreateRoom: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.formContainer}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <div className={style.userPicture}>
          <Icon className={style.userIcon} name="user-circle" size="fa-3x" />
          <Icon className={style.cameraIcon} name="camera" size="fa-lg" />
        </div>
        <Input placeHolder="Your name" />
        <Input placeHolder="Your team name" />
        <Input placeHolder="Description" />
        <div className={style.buttonContainer}>
          <Button type="primary">Create</Button>
          <Button type="secondary">Cancel</Button>
        </div>
      </div>
    </div>
  );
};

export default CreateRoom;
