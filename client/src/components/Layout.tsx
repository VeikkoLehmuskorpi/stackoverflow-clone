import React, { ReactNode } from 'react';
import Head from 'next/head';
import { Layout } from 'antd';
import Navbar from 'src/components/Navbar';

interface Props {
  children: ReactNode;
  title?: string;
}

const CustomLayout = (props: Props) => {
  return (
    <Layout style={{ height: '100vh' }}>
      <Head>
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      {props.children}
    </Layout>
  );
};

CustomLayout.defaultProps = { title: 'Stack Overflow' };

export default CustomLayout;
