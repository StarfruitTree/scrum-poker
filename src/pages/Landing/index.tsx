import React from 'react';
import { Button, Typo } from '@scrpoker/components';
import style from './style.module.scss';
import packagejson from '../../../package.json';

const LandingPage: React.FC = () => {
  return (
    <div className={style.container}>
      <div>
        <div className={style.title}>
          <Typo type="h1">Scrum Poker</Typo>
          <Typo type="span">v{packagejson.version}</Typo>
        </div>
        <Typo>Planing remotely has never been so easy. Why not?</Typo>
        <hr />
        <Button linkTo="/welcome" icon="arrow-right">
          Get started
        </Button>
      </div>
    </div>
  );
};

export default LandingPage;
