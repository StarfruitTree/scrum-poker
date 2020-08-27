import React from 'react';

interface Props {
  label: string;
}

export default function Navbar({ label }: Props) {
  return <h1>{label}</h1>;
}
