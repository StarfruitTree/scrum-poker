import React from 'react';

interface Props {
  icon: string;
}

const Icon: React.FC<Props> = ({ icon }) => {
  return <i className={'fas fa-' + icon} />;
};

export default Icon;
