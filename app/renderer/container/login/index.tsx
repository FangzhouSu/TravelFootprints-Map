import React, { useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Tabs, Form, Input, Button, message } from 'antd';
import type { TabsProps } from 'antd';
import Captcha from 'react-captcha-code';
import { ipcRenderer } from 'electron';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import ROUTER from '@common/constants/router';
import { post } from '@common/utils/index';
import './index.less';

interface FormSubmitProps {
  username: string;
  password: string;
  verify?: string;
}

function Login() {
  const navigate = useNavigate();
  const captcha = useRef<string>(''); // 更改后的验证码

  // 登陆-提交表单信息
  const onLogin = async (values: FormSubmitProps) => {
    const { username, password } = values;

    // TODO: 改用Form表单自己的校验规则
    if (!username) {
      message.error('请输入用户名!');
      return;
    }

    if (!password) {
      message.error('请输入密码!');
      return;
    }

    try {
      const { data } = await post('/api/user/login', {
        username,
        password,
      });
      console.log('the token is:', data.token);

      ipcRenderer.send('change-window-size', { width: 1200, height: 800 });

      localStorage.setItem('token', data.token);
      message.success('登陆成功！');
      navigate(ROUTER.system);
    } catch (error: any) {
      message.error(error.msg);
    }
  };

  // 注册-提交表单信息
  const onRegister = async (values: FormSubmitProps) => {
    const { username, password, verify } = values;
    console.log(username, password, verify);

    // TODO: 改用Form表单自己的校验规则
    if (!username || username.length < 4) {
      message.error('必须输入不少于四位字符的用户名!');
      return;
    }

    if (!password || password.length < 6) {
      message.error('必须输入不少于六位字符的密码!');
      return;
    }

    if (!verify || verify !== captcha.current) {
      message.error('请确保自己输入正确的验证码!');
      return;
    }

    try {
      await post('/api/user/register', {
        username,
        password,
      });
      message.success('注册成功!');
    } catch (error: any) {
      console.error('出现问题 注册失败!');
      message.error(error.msg);
    }
  };

  // 注册-更新验证码
  const handleCaptchaChange = useCallback((capt: string) => {
    console.log(capt);
    captcha.current = capt;
  }, []);

  const loginForm = () => (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onLogin}>
      <Form.Item name="username">
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="username"
          placeholder="请输入您的用户名！"
        />
      </Form.Item>
      <Form.Item name="password">
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入您的密码！"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          登录
        </Button>
      </Form.Item>
    </Form>
  );

  // 注册-判断表单提交时各项数据是否正确
  const registerForm = () => (
    <Form name="normal_login" className="login-form" initialValues={{ remember: true }} onFinish={onRegister}>
      <Form.Item name="username">
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          type="username"
          placeholder="请输入您的用户名！"
        />
      </Form.Item>
      <Form.Item name="password">
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="请输入您的密码！"
        />
      </Form.Item>
      <Form.Item name="verify">
        <div styleName="captcha_box">
          <Input prefix={<LockOutlined className="site-form-item-icon" />} type="verify" placeholder="请输入验证码！" />
          <Captcha charNum={4} onChange={handleCaptchaChange} />
        </div>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="login-form-button">
          注册
        </Button>
      </Form.Item>
    </Form>
  );

  const items: TabsProps['items'] = [
    {
      key: 'login',
      label: `登陆`,
      children: loginForm(),
    },
    {
      key: 'register',
      label: `注册`,
      children: registerForm(),
    },
  ];

  return (
    <div styleName="login">
      <div styleName="auth">
        <Tabs defaultActiveKey="1" centered items={items} />
      </div>
    </div>
  );
}

export default Login;
