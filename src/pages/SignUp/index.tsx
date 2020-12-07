import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, Typo, Input, Card, Checkbox } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions, store } from '@scrpoker/store';

const USER_NAME = 'userName';
const PASSWORD = 'password';
const EMAIL = 'email';
const CONFIRM_PASSWORD = 'confirmPassword';

const SignUp: React.FC = () => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPersistentLogin, setIsPersistentLogin] = useState(false);
  const history = useHistory();

  const goBack = () => history.goBack();

  const submit = async () => {
    if (confirmPassword !== password) {
      alert('The password confirmation does not match');
    } else {
      const signUpData: ISignUpData = {
        userName: userName,
        password: password,
        email: email,
      };

      try {
        await store.dispatch<any>(Actions.userActions.signUp(signUpData));
        history.push('/home');
      } catch (err) {
        console.log(err);
      }
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
      case CONFIRM_PASSWORD:
        setConfirmPassword(value);
      default:
        setEmail(value);
    }
  };

  const handleIsChecked = () => {
    setIsPersistentLogin(!isPersistentLogin);
  };

  return (
    <div className={style.container}>
      <Card width={450}>
        <div className={style.title}>
          <Typo type="h2">Sign Up</Typo>
          <Link to="/login">Sign In</Link>
        </div>
        <Input name={EMAIL} onTextChange={handleTextChange} placeholder="Enter your email" />
        <Input name={USER_NAME} onTextChange={handleTextChange} placeholder="Enter your username" />
        <Input name={PASSWORD} onTextChange={handleTextChange} placeholder="Enter your password" />
        <Input name={CONFIRM_PASSWORD} onTextChange={handleTextChange} placeholder="Confirm your password" />
        <div className={style.checkBoxContainer}>
          <Checkbox isChecked={isPersistentLogin} checkHandler={handleIsChecked} />
          <Typo>Keep me signed in</Typo>
        </div>
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
