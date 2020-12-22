import React from 'react';
import { Typo, Button, Card } from '@scrpoker/components';
import style from './style.module.scss';

const Welcome: React.FC = () => {
  return (
    <div className={style.container}>
      <Card width={450}>
        <Typo type="h2">Let&apos;s get started</Typo>
        <Typo>So, you want to:</Typo>
        <Button fullWidth linkTo="/room/join">
          Join a room
        </Button>
        <Button fullWidth linkTo="/login" secondary>
          Sign In
        </Button>
      </Card>
    </div>
  );
};

export default Welcome;
