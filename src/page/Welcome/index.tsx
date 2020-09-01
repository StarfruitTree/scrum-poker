import React from 'react';
import { Button, Typo } from '@scrpoker/components';
import Style from './style.module.scss';

export default function Welcome() {
  return (
    <div className={Style.container}>
      <div className={Style['form-container']}>
        <div>
          <Typo type="h2">Let's get started</Typo>
          <Typo>So, you want to:</Typo>
        </div>
        <Button className={Style['custom-button']} buttonType="primary">
          Create a new room
        </Button>
        <Button className={Style['custom-button']} buttonType="secondary">
          Join a room
        </Button>
      </div>
    </div>
  );
}
