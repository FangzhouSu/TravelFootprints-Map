import React from 'react';
import { useHistory } from 'react-router';
import { Tabs, Input, Button } from 'antd';
import type { TabsProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import ROUTER from '@common/constants/router';
import './index.less'

function Login() {
  const history = useHistory();

  const loginForm = () => (
    <div>
      <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
      <Input.Password placeholder="input password" />
      <Button type="primary" shape="round" size="large">
        登录
      </Button>
    </div>
  );

  const registerForm = () => (
    <div>
      <Input placeholder="请输入用户名" prefix={<UserOutlined />} />
      <Input.Password placeholder="input password" />
      <Button shape="round" size="large">
        注册
      </Button>
    </div>
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
        <Tabs
          defaultActiveKey="1"
          items={items}
        />
      </div>
    </div>
  );
}

export default Login;
