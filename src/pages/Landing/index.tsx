import React from 'react';
import { Button, Typo } from '@scrpoker/components';
import style from './style.module.scss';

const LandingPage: React.FC = () => {
  return (
    <div className={style.container}>
      <div>
        <Typo type="h2">Scrum Poker</Typo>
        <Typo>Planing remotely has never been so easy. Why not?</Typo>
        <hr />
        <Button
          className={style.customButton}
          icon="arrow-right"
          type="primary"
        >
          Get started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
