import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input, Card, AvatarInput } from '@scrpoker/components';
import { SIGN_UP } from '@scrpoker/constants/apis';
import style from './style.module.scss';
import { Actions, store } from '@scrpoker/store';

const USER_NAME = 'userName';
const PASSWORD = 'password';
const EMAIL = 'email';

const SignUp: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const goBack = () => history.goBack();

  const submit = async () => {
    const userData = {
      userName: userName,
      password: password,
      email: email,
    };

    try {
      const response = await fetch(SIGN_UP, {
        method: 'post',
        body: JSON.stringify(userData),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status == 406) {
        alert(data.error);
      } else {
        store.dispatch(
          Actions.userActions.updateUserInfo({ jwtToken: data.token, userName: data.userName, userId: data.userId })
        );
        console.log(store.getState());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case USER_NAME:
        setUserName(value);
        break;
      case PASSWORD:
        setPassword(value);
        break;
      default:
        setEmail(value);
    }
  };

  return (
    <div className={style.container}>
      <Card width={450}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <AvatarInput className={style.avatar} />
        <Input name={EMAIL} onTextChange={handleTextChange} placeholder="Email" />
        <Input name={USER_NAME} onTextChange={handleTextChange} placeholder="Username" />
        <Input name={PASSWORD} onTextChange={handleTextChange} placeholder="Password" />
        <Button fullWidth onClick={submit}>
          Create
        </Button>
        <Button fullWidth secondary onClick={goBack}>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default SignUp;