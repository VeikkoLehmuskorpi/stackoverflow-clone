import { grey } from '@ant-design/colors';
import {
  InboxOutlined,
  LogoutOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  TrophyOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Grid, Input, Space, Tooltip } from 'antd';
import Link from 'next/link';
import soIcon from 'public/so-icon.svg';
import soLogo from 'public/so-logo.svg';
import React from 'react';
import Container from 'src/components/Container';
import { useMeQuery } from 'src/generated/graphql';

const { useBreakpoint } = Grid;

interface Props {}

const Navbar = (props: Props) => {
  const [res] = useMeQuery();
  const breakpoints = useBreakpoint();

  const logout = () => {
    // TODO: Handle user logging out
  };

  const renderUserSection = () => {
    if (res.fetching) {
    } else if (!res.data?.me) {
      return (
        <Space style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/users/login">
            <Button>Login</Button>
          </Link>
          <Link href="/users/signup">
            <Button type="primary">Signup</Button>
          </Link>
        </Space>
      );
    } else {
      return (
        <Space size="middle">
          <Link href={`/users/${res.data.me.uid}/${res.data.me.username}`}>
            <Tooltip title={res.data.me.username} arrowPointAtCenter>
              <UserOutlined
                style={{ fontSize: '1.25rem', cursor: 'pointer' }}
              />
            </Tooltip>
          </Link>
          <Tooltip title="Recent inbox messages" arrowPointAtCenter>
            <InboxOutlined style={{ fontSize: '1.25rem', cursor: 'pointer' }} />
          </Tooltip>
          <Tooltip
            title="Recent achievements: reputation, badges, and privileges earned"
            placement="topRight">
            <TrophyOutlined
              style={{ fontSize: '1.25rem', cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title="Help Center and other resources" placement="topRight">
            <QuestionCircleOutlined
              style={{ fontSize: '1.25rem', cursor: 'pointer' }}
            />
          </Tooltip>
          <Tooltip title="Logout" placement="topRight">
            <LogoutOutlined
              onClick={logout}
              style={{ fontSize: '1.25rem', cursor: 'pointer' }}
            />
          </Tooltip>
        </Space>
      );
    }
  };

  return (
    <nav
      style={{
        background: '#fafafa',
        color: grey[3],
        padding: '0.25rem 0.5rem',
        borderTop: '3px solid #f48024',
        boxShadow: '0px 1px 6px -3px rgba(12, 13, 14, 0.15) ',
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
                <a
                  style={{
                    color: grey[5],
                    whiteSpace: 'nowrap',
                  }}>
                  Products
                </a>
              </Space>
            </Space>
            {breakpoints.sm ? (
              <Input
                placeholder="Search..."
                prefix={<SearchOutlined style={{ opacity: '0.3' }} />}
                style={{ margin: '0.35rem' }}></Input>
            ) : (
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'end',
                  alignItems: 'center',
                  flex: '1',
                }}>
                <div style={{ marginLeft: 'auto' }}>
                  <SearchOutlined
                    style={{
                      color: grey[2],
                      fontSize: '1.25rem',
                      cursor: 'pointer',
                    }}
                  />
                </div>
              </div>
            )}
          </section>

          <section style={{ marginLeft: '0.5rem' }}>
            {renderUserSection()}
          </section>
        </div>
      </Container>
    </nav>
  );
};

export default Navbar;
