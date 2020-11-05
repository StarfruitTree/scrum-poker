import React from 'react';
import { Button, Typo, Icon } from '@scrpoker/components';
import style from './style.module.scss';
import packagejson from '../../../package.json';
import { Link } from 'react-router-dom';

const LandingPage: React.FC = () => {
  return (
    <div className={style.container}>
      <div>
        <div className={style.title}>
          <Typo type="h2">Scrum Poker </Typo>
          <Typo type="span">v{packagejson.version}</Typo>
        </div>
        <Typo>Planing remotely has never been so easy. Why not?</Typo>
        <hr />
        <Link to="/welcome">
          <Button
            disabled={false}
            className={style.customButton}
            icon="arrow-right"
            type="primary"
          >
            Get started
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
