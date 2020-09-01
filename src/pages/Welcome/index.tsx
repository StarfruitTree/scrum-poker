import React from 'react';
import { Button, Typo } from '@scrpoker/components';
import style from './style.module.scss';

export default function Welcome() {
  return (
    <div className={style.container}>
      <div className={style['form-container']}>
        <div>
          <Typo type="h2">Let's get started</Typo>
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
}
