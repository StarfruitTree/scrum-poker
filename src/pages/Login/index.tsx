import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Button, Typo, Input, Card, Checkbox } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions, store } from '@scrpoker/store';

const EMAIL = 'email';
const PASSWORD = 'password';

const Login: React.FC = () => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPersistentLogin, setIsPersistentLogin] = useState(false);
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

  const handleIsChecked = () => {
    setIsPersistentLogin(!isPersistentLogin);
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
        <div className={style.title}>
          <Typo type="h2">Sign In</Typo>
          <Link to="/signup">Sign Up</Link>
        </div>
        <Input name={EMAIL} onTextChange={handleTextChange} placeholder="Enter your email" />
        <Input name={PASSWORD} type="password" onTextChange={handleTextChange} placeholder="Enter your password" />
        <div className={style.checkBoxContainer}>
          <Checkbox isChecked={isPersistentLogin} checkHandler={handleIsChecked} />
          <Typo>Keep me signed in</Typo>
        </div>
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
