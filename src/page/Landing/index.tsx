import React from 'react';
import Typo from '@scrpoker/components/Typo';
import { Button } from '@scrpoker/components';
import Style from './style.module.css';

export default function LandingPage() {
  return (
    <div className={Style.container}>
      <div>
        <Typo type="h2">Scrum Poker</Typo>
        <Typo>Planing remotely has never been so easy. Why not?</Typo>
        <hr />
        <Button
          iconClassName="arrow-right"
          label="Get started"
          buttonType="primary"
        ></Button>
      </div>
    </div>
  );
}
