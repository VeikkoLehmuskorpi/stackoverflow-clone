import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const Container = ({ children }: Props): ReactElement => {
  const containerStyles = {
    width: '100%',
    maxWidth: '60rem',
    margin: '0 auto',
    padding: '1.5rem',
  };

  return <div style={containerStyles}>{children}</div>;
};

export default Container;
