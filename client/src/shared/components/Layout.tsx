import React, { ReactNode } from 'react';
import { Layout } from 'antd';

interface Props {
  children: ReactNode;
}

const CustomLayout = (props: Props) => {
  return <Layout style={{ height: '100vh' }}>{props.children}</Layout>;
};

export default CustomLayout;
