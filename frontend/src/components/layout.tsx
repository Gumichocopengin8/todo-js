import React from 'react';
import { Layout, Menu, Empty, Tabs } from 'antd';
import '../css/layout.css';
import TodoCard from './todoCard';

const LayoutMain = () => {
  const { Header, Footer, Sider, Content } = Layout;
  const { TabPane } = Tabs;

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <div className="title">todo-js</div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item key="1">nav 1</Menu.Item>
          <Menu.Item key="2">nav 2</Menu.Item>
          <Menu.Item key="3">nav 3</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="contents">
        <Content style={{ width: '88%' }}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Todo" key="1">
              <TodoCard />
            </TabPane>
            <TabPane tab="Done" key="2">
              <TodoCard />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
