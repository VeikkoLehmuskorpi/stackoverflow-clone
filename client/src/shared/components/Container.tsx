import React, { ReactElement } from 'react';

interface Props {
  children: unknown;
}

const Container = ({ children }: Props): ReactElement => {
  const containerStyles = {
    maxWidth: '60rem',
    margin: '0 auto',
    padding: '1.5rem',
  };

  return <div style={containerStyles}>{children}</div>;
};

export default Container;
