import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  usePadding?: boolean;
}

const Container = (props: Props): ReactElement => {
  const containerStyles = {
    width: '100%',
    maxWidth: '80rem',
    margin: '0 auto',
    padding: props.usePadding ? '1.5rem' : '0',
  };

  return <div style={containerStyles}>{props.children}</div>;
};

Container.defaultProps = { usePadding: true };

export default Container;
