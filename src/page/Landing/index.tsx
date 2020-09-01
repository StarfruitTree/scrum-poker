import React from 'react';
import { Button, Typo } from '@scrpoker/components';
import Style from './style.module.scss';

export default function LandingPage() {
  return (
    <div className={Style.container}>
      <div>
        <Typo type="h2">Scrum Poker</Typo>
        <Typo>Planing remotely has never been so easy. Why not?</Typo>
        <hr />
        <Button
          className={Style['custom-button']}
          iconClassName="arrow-right"
          buttonType="primary"
        >
          Get started
        </Button>
      </div>
    </div>
  );
}
