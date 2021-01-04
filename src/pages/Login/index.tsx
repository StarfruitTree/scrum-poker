import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Button, Typo, Input, Card, Checkbox } from '@scrpoker/components';
import style from './style.module.scss';
import { Actions } from '@scrpoker/store';

const EMAIL = 'email';
const PASSWORD = 'password';

interface Props {
  login: (data: ILoginData) => Promise<void | boolean>;
  setIsTokenValid: (isValid: boolean) => void;
}

const Login: React.FC<Props> = ({ login, setIsTokenValid }) => {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [isPersistentLogin, setIsPersistentLogin] = useState(false);
  const history = useHistory();

  const goBack = () => history.push('/welcome');

  const submit = async () => {
    if (email && password) {
      const loginData: ILoginData = {
        password: password,
        email: email,
      };

      try {
        const isLoginSuccessful = await login(loginData);
        if (isLoginSuccessful) {
          setIsTokenValid(true);
          history.push('/home');
        } else alert('Invalid username or password');
      } catch (err) {
        alert(err);
      }
    } else alert('Please fill up empty fields');
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

const mapDispatchToProps = {
  login: Actions.userActions.login,
};

export default connect(null, mapDispatchToProps)(Login);
