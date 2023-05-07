import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import ROUTER from '@common/constants/router';
import { Layout, Menu, Button } from 'antd';
import type { MenuProps } from 'antd';
import React, { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import './index.less';

const { Header, Sider, Content } = Layout;
type MenuItem = Required<MenuProps>['items'][number];

const System = () => {
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  // 控制打开的是哪个路由;
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([ROUTER.map]);

  const navigate = useNavigate();

  // 第一层的menu的key的集合
  const rootSubmenuKeys = [ROUTER.map, ROUTER.travelplan, ROUTER.notelist, ROUTER.travelplan, ROUTER.footprint];

  // 更换打开的item
  const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const changeRouter = (e: any) => {
    console.log('目前跳转到的路由', e.key);
    navigate(e.key, { replace: true });
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const items: MenuItem[] = [
    getItem('旅行足迹地图', ROUTER.map, <UserOutlined />),
    getItem('旅行计划规划', ROUTER.travelplan, <VideoCameraOutlined />),
    getItem('我的游记', ROUTER.notelist, <UserOutlined />),
    getItem('旅行足迹生成', ROUTER.footprint, <UploadOutlined />),
  ];

  return (
    <Layout styleName="system">
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
      >
        <div className="logo" />
        <Button type="primary" onClick={toggleCollapsed} style={{ marginBottom: 16 }}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          styleName="menu"
          theme="dark"
          defaultSelectedKeys={[ROUTER.map]}
          openKeys={openKeys}
          mode="inline"
          inlineCollapsed={collapsed}
          items={items}
          onOpenChange={onOpenChange}
          onClick={changeRouter}
        />
      </Sider>
      <Layout className="site-layout" style={{ marginLeft: 200, overflow: 'scroll' }}>
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px 0',
            overflow: 'initial',
            padding: 24,
            minHeight: 280,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default System;
