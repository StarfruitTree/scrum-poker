import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Typo, Input, Card, AvatarInput } from '@scrpoker/components';
import { UserContext } from '@scrpoker/contexts';
import { CREATE_ROOM } from '@scrpoker/constants/apis';
import style from './style.module.scss';

const HOST_NAME = 'hostName';
const ROOM_NAME = 'roomName';
const DESCRIPTION = 'description';

const CreateRoom: React.FC = () => {
  const [hostName, setHostName] = useState('');
  const [roomName, setRoomName] = useState('');
  const [description, setDescription] = useState('');
  const context = useContext(UserContext);
  const history = useHistory();

  const goBack = () => history.goBack();

  const submit = async () => {
    const userData = new FormData();
    userData.append(HOST_NAME, hostName);
    userData.append(ROOM_NAME, roomName);
    userData.append(DESCRIPTION, description);
    context.action = 'create';
    context.userRole = 0;
    context.roomState = 'waiting';
    try {
      const response = await fetch(CREATE_ROOM, {
        method: 'post',
        body: userData,
      });

      const data = await response.json();

      if (response.status == 406) {
        alert(data.error);
      } else {
        context.roomCode = data.code;
        history.push(`/room/${data.code}`);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleTextChange = ({ target: { name, value } }: React.ChangeEvent<HTMLInputElement>) => {
    switch (name) {
      case HOST_NAME:
        context.username = value;
        setHostName(value);
        break;
      case ROOM_NAME:
        context.roomName = value;
        setRoomName(value);
        break;
      default:
        context.description = value;
        setDescription(value);
    }
  };

  return (
    <div className={style.container}>
      <Card width={450}>
        <Typo type="h2">Almost there!</Typo>
        <Typo>We just need to know some info...</Typo>
        <AvatarInput className={style.avatar} />
        <Input name={HOST_NAME} onTextChange={handleTextChange} placeholder="Your name" />
        <Input name={ROOM_NAME} onTextChange={handleTextChange} placeholder="Your team name" />
        <Input name={DESCRIPTION} onTextChange={handleTextChange} placeholder="Description" />
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

export default CreateRoom;
