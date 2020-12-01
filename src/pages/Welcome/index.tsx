import React from 'react';
import { Typo, Button, Card } from '@scrpoker/components';
import style from './style.module.scss';

const Welcome: React.FC = () => {
  return (
    <div className={style.container}>
      <Card width={450}>
        <Typo type="h2">Let&apos;s get started</Typo>
        <Typo>So, you want to:</Typo>
        <Button fullWidth linkTo="/Login">
          Sign In
        </Button>
        <Button fullWidth linkTo="/signup">
          Sign Up
        </Button>
        <Button fullWidth linkTo="/room/join" secondary>
          Join a room without signing up
        </Button>
      </Card>
    </div>
  );
};

export default Welcome;
