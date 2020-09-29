import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { Button, Card, Col, Form, Input, Layout, Row } from 'antd';
import Link from 'next/link';
import { useRouter } from 'next/router';
import soIcon from 'public/so-icon.svg';
import React from 'react';
import Container from 'src/components/Container';
import CustomLayout from 'src/components/Layout';
import { useLoginMutation } from 'src/generated/graphql';

const { Content } = Layout;

const formIconStyle = {
  opacity: '0.3',
};

const formValidationRules = {
  email: [
    {
      required: true,
      message: 'Email cannot be empty',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password cannot be empty',
    },
  ],
};

interface FormValues {
  email: string;
  password: string;
}

interface Props {}

const login = (props: Props) => {
  const router = useRouter();
  const [res, loginMut] = useLoginMutation();
  const [form] = Form.useForm();

  const login = async (formValues: FormValues) => {
    const { email, password } = formValues;

    const resp = await loginMut({ options: { email, password } });

    if (resp.error) {
      form.setFields([
        { name: 'email', errors: ['The email or password is incorrect.'] },
      ]);
    } else if (resp.data?.login.uid) {
      router.push('/');
    }

    return resp;
  };

  return (
    <CustomLayout title="Login - Stack Overflow">
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Container>
          <Row align="middle">
            <Col
              span={24}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <section style={{ marginBottom: '1rem' }}>
                <Link href="/">
                  <img
                    src={soIcon}
                    alt="Stack Overflow logo"
                    style={{ width: '3rem' }}></img>
                </Link>
              </section>
              <Card bordered style={{ width: '100%', maxWidth: '25rem' }}>
                <Form
                  form={form}
                  initialValues={{}}
                  layout="vertical"
                  onFinish={login}>
                  <Form.Item
                    name="email"
                    label="Email"
                    rules={formValidationRules.email}>
                    <Input
                      prefix={<MailOutlined style={formIconStyle} />}
                      type="email"
                      disabled={res.fetching}></Input>
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="Password"
                    rules={formValidationRules.password}>
                    <Input.Password
                      prefix={<LockOutlined style={formIconStyle} />}
                      type="password"
                      disabled={res.fetching}></Input.Password>
                  </Form.Item>
                  <Form.Item
                    style={{ marginTop: '1.5rem', marginBottom: 0 }}
                    shouldUpdate={true}>
                    {() => (
                      <Button
                        type="primary"
                        block
                        htmlType="submit"
                        disabled={
                          !form.isFieldsTouched(true) ||
                          Boolean(
                            form
                              .getFieldsError()
                              .filter(({ errors }) => errors.length).length
                          )
                        }
                        loading={res.fetching}>
                        Login
                      </Button>
                    )}
                  </Form.Item>
                </Form>
              </Card>
              <section style={{ marginTop: '1rem' }}>
                <p>
                  Don't have an account?{' '}
                  <Link href="/users/signup">Sign up</Link>
                </p>
              </section>
            </Col>
          </Row>
        </Container>
      </Content>
    </CustomLayout>
  );
};

export default login;
