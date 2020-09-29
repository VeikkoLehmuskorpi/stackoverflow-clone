import React, { ReactElement, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  usePadding?: boolean;
  paddingVertical: string;
  paddingHorizontal: string;
}

const Container = (props: Props): ReactElement => {
  const containerStyles = {
    width: '100%',
    maxWidth: '80rem',
    margin: '0 auto',
    padding: props.usePadding
      ? `${props.paddingVertical} ${props.paddingHorizontal}`
      : '0',
  };

  return <div style={containerStyles}>{props.children}</div>;
};

Container.defaultProps = {
  usePadding: true,
  paddingVertical: '1.5rem',
  paddingHorizontal: '1.5rem',
};

export default Container;
