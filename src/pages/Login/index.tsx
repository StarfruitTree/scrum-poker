import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input, Card, AvatarInput } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions, store } from '@scrpoker/store';

const EMAIL = 'email';
const PASSWORD = 'password';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const history = useHistory();

  const goBack = () => history.goBack();

  const submit = async () => {
    const loginData: ILoginData = {
      password: password,
      email: email,
    };

    try {
      await store.dispatch<any>(Actions.userActions.login(loginData));
      console.log(store.getState());
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
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
        <Input name={PASSWORD} onTextChange={handleTextChange} placeholder="Password" />
        <Button fullWidth onClick={submit}>
          Login
        </Button>
        <Button fullWidth secondary onClick={goBack}>
          Cancel
        </Button>
      </Card>
    </div>
  );
};

export default Login;
