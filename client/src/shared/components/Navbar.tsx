import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Row, Col, Button, Space, Grid, Input } from 'antd';
import { grey } from '@ant-design/colors';
import Container from './Container';
import soLogo from '../../../public/so-logo.svg';
import soIcon from '../../../public/so-icon.svg';
import { SearchOutlined } from '@ant-design/icons';

const { useBreakpoint } = Grid;

const linkStyle = {
  color: grey[5],
  whiteSpace: 'nowrap',
};

interface Props {}

const Navbar = (props: Props) => {
  const router = useRouter();
  const breakpoints = useBreakpoint();

  return (
    <nav
      style={{
        background: '#fafafa',
        color: grey[3],
        padding: '0.25rem 0.5rem',
      }}>
      <Container usePadding={false}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <section style={{ display: 'flex', flex: '1' }}>
            <Space size="middle">
              <Link href="/">
                <img
                  src={breakpoints.md ? soLogo : soIcon}
                  alt="Stack Overflow Logo"
                  style={{ height: '2.5rem', cursor: 'pointer' }}></img>
              </Link>
              <Space size="large" style={{ marginRight: '1rem' }}>
                {/* {breakpoints.md && (
                  <a
                    style={{
                      color: grey[5],
                      whiteSpace: 'nowrap',
                    }}>
                    About
                  </a>
                )} */}
                <a
                  style={{
                    color: grey[5],
                    whiteSpace: 'nowrap',
                  }}>
                  Products
                </a>
                {/* {breakpoints.md && (
                  <a
                    style={{
                      color: grey[5],
                      whiteSpace: 'nowrap',
                    }}>
                    For Teams
                  </a>
                )} */}
              </Space>
            </Space>
            {breakpoints.sm && (
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined style={{ opacity: '0.3' }} />}
                style={{ margin: '0.35rem' }}></Input>
            )}
          </section>

          <section style={{ marginLeft: '0.5rem' }}>
            <Space style={{ display: 'flex', alignItems: 'center' }}>
              {!breakpoints.sm && (
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    flex: '1',
                  }}>
                  <SearchOutlined
                    style={{ color: grey[2], fontSize: '1.25rem' }}
                  />
                </div>
              )}
              <Link href="/users/login">
                <Button>Login</Button>
              </Link>
              <Link href="/users/signup">
                <Button type="primary">Signup</Button>
              </Link>
            </Space>
          </section>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
