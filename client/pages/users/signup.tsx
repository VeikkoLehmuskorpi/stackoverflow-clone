import React, { ReactElement, useState } from 'react';
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
import Container from '../../shared/components/Container';

const { Content } = Layout;
const { Title } = Typography;
const { useBreakpoint } = Grid;

const formIconStyle = {
  opacity: '0.3',
};

const formValidationRules = {
  displayName: [
    {
      required: true,
      message: 'Display name cannot be empty.',
    },
    {
      max: 64,
      message: 'Display name cannot be more than 64 characters.',
    },
    {
      pattern: /^\S+$/g,
      message: 'Display name cannot contain spaces.',
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
      message: 'Password cannot be less than 10 characters.',
    },
    {
      pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{0,}$/g,
      message:
        'Password must contain at least one symbol, one number, one lowercase letter and one uppercase letter.',
    },
  ],
};

interface Props {}

const Signup = (props: Props): ReactElement => {
  const [form] = Form.useForm();
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  const breakpoint = useBreakpoint();

  const onFinish = (values) => {
    setIsFormSubmitting(true);

    console.log({ values });
  };

  return (
    <Layout>
      <Content>
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
              <Title
                level={2}
                style={!breakpoint.md && { textAlign: 'center' }}>
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
            </Col>
            <Col
              xs={{ span: 24 }}
              md={{ span: 12 }}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <Card bordered style={{ maxWidth: '25rem' }}>
                <Form
                  form={form}
                  initialValues={{}}
                  layout="vertical"
                  onFinish={onFinish}>
                  <Space
                    direction="vertical"
                    size="small"
                    style={{ width: '100%' }}>
                    <Form.Item
                      name="displayName"
                      label="Display name"
                      rules={formValidationRules.displayName}>
                      <Input
                        disabled={isFormSubmitting}
                        prefix={<UserOutlined style={formIconStyle} />}></Input>
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label="Email"
                      rules={formValidationRules.email}>
                      <Input
                        disabled={isFormSubmitting}
                        prefix={<MailOutlined style={formIconStyle} />}
                        type="email"></Input>
                    </Form.Item>
                    <Form.Item
                      label="Password"
                      name="password"
                      rules={formValidationRules.password}>
                      <Input.Password
                        disabled={isFormSubmitting}
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
                              .filter(({ errors }) => errors.length).length,
                          )
                        }
                        loading={isFormSubmitting}>
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
            </Col>
          </Row>
        </Container>
      </Content>
    </Layout>
  );
};

export default Signup;
