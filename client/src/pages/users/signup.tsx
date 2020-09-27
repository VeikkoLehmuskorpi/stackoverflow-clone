import React, { useEffect, ReactElement } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  Layout,
  Button,
  Form,
  Input,
  Space,
  Card,
  Row,
  Col,
  Typography,
  Grid,
} from 'antd';
import {
  LikeTwoTone,
  LockOutlined,
  MailOutlined,
  QuestionCircleTwoTone,
  TagsTwoTone,
  TrophyTwoTone,
  UserOutlined,
} from '@ant-design/icons';
import { grey } from '@ant-design/colors';
import { useRegisterMutation } from '../../generated/graphql';
import Container from '../../shared/components/Container';
import { toFormErrorMap } from '../../shared/util';
import CustomLayout from '../../shared/components/Layout';

const { Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const formIconStyle = {
  opacity: '0.3',
};

const formValidationRules = {
  username: [
    {
      required: true,
      message: 'Username cannot be empty.',
    },
    {
      max: 64,
      message: 'Username must be shorter than or equal to 64 characters.',
    },
    {
      pattern: /^\S+$/g,
      message: 'Username cannot contain spaces.',
    },
  ],
  email: [
    {
      required: true,
      message: 'Email cannot be empty.',
    },
    {
      pattern: /^\S+$/g,
      message: 'Email cannot contain spaces.',
    },
  ],
  password: [
    {
      required: true,
      message: 'Password cannot be empty.',
    },
    {
      min: 10,
      message: 'Password must be longer than or equal to 10 characters.',
    },
    {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/g,
      message:
        'Password must contain at least one symbol, one number, one lowercase letter and one uppercase letter.',
    },
  ],
};

interface FormValues {
  username: string;
  email: string;
  password: string;
}

interface Props {}

const Signup = (props: Props): ReactElement => {
  const router = useRouter();
  const [res, registerMut] = useRegisterMutation();
  const [form] = Form.useForm();
  const breakpoint = useBreakpoint();

  useEffect(() => {
    // Prefetch the login page
    router.prefetch('/users/login');
  }, []);

  const register = async (formValues: FormValues) => {
    const { username, email, password } = formValues;

    const resp = await registerMut({
      email,
      password,
      username,
    });

    if (resp.error) {
      if (resp.error?.message.includes('Validation error')) {
        form.setFields(
          toFormErrorMap(resp.error.graphQLErrors[0].extensions?.errors)
        );
      }
      // TODO: Something else went wrong, handle it in the UI
    } else if (resp.data?.register.uid) {
      // Registration was successful, redirect user to the login page
      console.log(resp.data.register);

      router.push('/users/login');
    }

    return resp;
  };

  return (
    <CustomLayout>
      <Content
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Container>
          <Row align="middle" gutter={[8, 8]}>
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
              }}>
              <section>
                <Title
                  level={2}
                  style={!breakpoint.md ? { textAlign: 'center' } : {}}>
                  Join the Stack Overflow community
                </Title>
                {breakpoint.md && (
                  <React.Fragment>
                    <ul
                      style={{
                        listStyle: 'none',
                        padding: 0,
                        margin: 0,
                        marginTop: '1rem',
                      }}>
                      <Space direction="vertical" size="large">
                        <li>
                          <Space>
                            <QuestionCircleTwoTone
                              style={{ fontSize: '1.5rem' }}
                              twoToneColor="#0095ff"
                            />
                            Get unstuck — ask a question
                          </Space>
                        </li>
                        <li>
                          <Space>
                            <LikeTwoTone
                              style={{ fontSize: '1.5rem' }}
                              twoToneColor="#0095ff"
                            />
                            Unlock new privileges like voting and commenting
                          </Space>
                        </li>
                        <li>
                          <Space>
                            <TagsTwoTone
                              style={{ fontSize: '1.5rem' }}
                              twoToneColor="#0095ff"
                            />
                            Save your favorite tags, filters, and jobs
                          </Space>
                        </li>
                        <li>
                          <Space>
                            <TrophyTwoTone
                              style={{ fontSize: '1.5rem' }}
                              twoToneColor="#0095ff"
                            />
                            Earn reputation and badges
                          </Space>
                        </li>
                      </Space>
                    </ul>
                    <p style={{ marginTop: '1.5rem', color: grey[5] }}>
                      Use the power of Stack Overflow inside your organization.
                      Try a <a>free trial of Stack Overflow for Teams</a>.
                    </p>
                  </React.Fragment>
                )}
              </section>
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Card bordered style={{ maxWidth: '25rem' }}>
                <Form
                  form={form}
                  initialValues={{}}
                  layout="vertical"
                  onFinish={register}>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: '100%' }}>
                    <Form.Item
                      name="username"
                      label="Username"
                      rules={formValidationRules.username}>
                      <Input
                        disabled={res.fetching}
                        prefix={<UserOutlined style={formIconStyle} />}></Input>
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={formValidationRules.email}>
                      <Input
                        disabled={res.fetching}
                        prefix={<MailOutlined style={formIconStyle} />}
                        type="email"></Input>
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={formValidationRules.password}>
                      <Input.Password
                        disabled={res.fetching}
                        prefix={<LockOutlined style={formIconStyle} />}
                        type="password"></Input.Password>
                    </Form.Item>
                  </Space>
                  <Form.Item
                    style={{ marginTop: '1.5rem' }}
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
                        Sign up
                      </Button>
                    )}
                  </Form.Item>
                </Form>
                <p style={{ margin: 0, color: grey[5] }}>
                  By clicking “Sign up”, you agree to our{' '}
                  <a>terms of service</a>, <a>privacy policy</a> and{' '}
                  <a>cookie policy</a>
                </p>
              </Card>
              <section>
                <Space
                  direction="vertical"
                  style={{
                    marginTop: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                  }}>
                  <p style={{ margin: 0 }}>
                    Already have an account?{' '}
                    <Link href="/users/login">Log in</Link>
                  </p>
                  <p style={{ margin: 0 }}>
                    Are you an employer? <a>Sign up on Talent</a>
                  </p>
                </Space>
              </section>
            </Col>
          </Row>
        </Container>
      </Content>
    </CustomLayout>
  );
};

export default Signup;
