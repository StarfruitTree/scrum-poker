import React from 'react';
import { Typo, Button } from '@scrpoker/components';
import style from './style.module.scss';

const Welcome: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style['formContainer']}>
        <div>
          <Typo type="h2">Let&apos;s get started</Typo>
          <Typo>So, you want to:</Typo>
        </div>
        <Button className={style['custom-button']} type="primary">
          Create a new room
        </Button>
        <Button className={style['custom-button']} type="secondary">
          Join a room
        </Button>
      </div>
    </div>
  );
};

export default Welcome;
