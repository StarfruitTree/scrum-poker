import React from 'react';

interface Props {
  name: string;
}

const Icon: React.FC<Props> = ({ name }) => {
  return <i className={'fas fa-' + name} />;
};

export default Icon;
