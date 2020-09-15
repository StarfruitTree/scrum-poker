import React, { useCallback } from 'react';
import { Typo, Button } from '@scrpoker/components';
import style from './style.module.scss';
import { Link } from 'react-router-dom';

const Welcome: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style['formContainer']}>
        <div>
          <Typo type="h2">Let&apos;s get started</Typo>
          <Typo>So, you want to:</Typo>
        </div>
        <Link to="/room/create">
          <Button className={style['custom-button']} type="primary">
            Create a new room
          </Button>
        </Link>
        <Link to="/room/join">
          {' '}
          <Button className={style['custom-button']} type="secondary">
            Join a room
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
