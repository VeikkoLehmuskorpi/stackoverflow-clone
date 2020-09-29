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
import { useLogoutMutation, useMeQuery } from 'src/generated/graphql';

const { useBreakpoint } = Grid;

interface Props {}

const Navbar = (props: Props) => {
  const [currentUserRes] = useMeQuery();
  const [logoutRes, logoutMut] = useLogoutMutation();
  const breakpoints = useBreakpoint();

  const logout = async () => {
    const isLogoutSuccessful = await logoutMut();

    if (!isLogoutSuccessful) {
      // TODO: Handle user logout errors
      console.error(logoutRes);
    }
  };

  const renderUserSection = () => {
    if (currentUserRes.fetching) {
    } else if (!currentUserRes.data?.me) {
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
        <Space>
          <Link
            href={`/users/${currentUserRes.data.me.id}/${currentUserRes.data.me.username}`}>
            <Tooltip title={currentUserRes.data.me.username} arrowPointAtCenter>
              <Button shape="circle" icon={<UserOutlined />}></Button>
            </Tooltip>
          </Link>
          <Tooltip title="Recent inbox messages" arrowPointAtCenter>
            <Button shape="circle" icon={<InboxOutlined />}></Button>
          </Tooltip>
          <Tooltip
            title="Recent achievements: reputation, badges, and privileges earned"
            placement="topRight">
            <Button shape="circle" icon={<TrophyOutlined />}></Button>
          </Tooltip>
          <Tooltip title="Help Center and other resources" placement="topRight">
            <Button shape="circle" icon={<QuestionCircleOutlined />}></Button>
          </Tooltip>
          <Tooltip title="Logout" placement="topRight">
            <Button
              shape="circle"
              onClick={logout}
              loading={logoutRes.fetching}
              icon={<LogoutOutlined />}></Button>
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
        borderTop: '3px solid #f48024',
        boxShadow: '0px 1px 6px -3px rgba(12, 13, 14, 0.15) ',
      }}>
      <Container paddingVertical="0.2rem" paddingHorizontal="0.9rem">
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <section style={{ display: 'flex', flex: '1' }}>
            <Space size="middle">
              <Link href="/">
                {breakpoints.md ? (
                  <img
                    src={soLogo}
                    alt="Stack Overflow Logo"
                    style={{ height: '2.5rem', cursor: 'pointer' }}></img>
                ) : (
                  <img
                    src={soIcon}
                    alt="Stack Overflow Logo (Icon)"
                    style={{
                      height: '2.4rem',
                      cursor: 'pointer',
                      margin: '1px 0 0 2px',
                    }}></img>
                )}
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
                style={{
                  height: '2rem',
                  alignSelf: 'center',
                }}></Input>
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
