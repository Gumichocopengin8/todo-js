import React, { useState, useEffect } from 'react';
import { Layout, Menu, Empty, Tabs } from 'antd';
import '../css/layout.css';
import TodoCard from './todoCard';
import { fetchTodoListsUsingGET, fetchTodoListItemsUsingGET } from '../api/api';

const LayoutMain = () => {
  const { Sider, Content } = Layout;
  const { TabPane } = Tabs;
  const [lists, setLists] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [menu, setMenu] = useState('1');
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    let unmounted = false;
    const func = async () => {
      const todolists = await fetchTodoListsUsingGET();
      if (!unmounted) {
        setLists(todolists);
      }
    };
    func();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, []);

  useEffect(() => {
    let unmounted = false;
    const func = async () => {
      const todolistItems = await fetchTodoListItemsUsingGET(menu).catch(
        (err) => {
          console.error(err);
          return [];
        }
      );
      if (!unmounted) {
        setListItems(todolistItems);
      }
    };
    func();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, [menu, refresh]);

  const onClickMenu = (e) => setMenu(e.key);
  const onRefresh = () => setRefresh((state) => !state);

  return (
    <Layout style={{ height: '100vh' }}>
      <Sider>
        <div className="title">todo-js</div>
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          onClick={onClickMenu}
        >
          {lists.map((list) => (
            <Menu.Item key={list.id}>{list.name}</Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout className="contents">
        <Content style={{ width: '88%' }}>
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab="Todo" key="1">
              {listItems
                .filter((item) => !item.is_completed)
                .map((item) => (
                  <TodoCard
                    key={item.id}
                    item={item}
                    todolistId={menu}
                    onRefresh={onRefresh}
                  />
                ))}
            </TabPane>
            <TabPane tab="Done" key="2">
              {listItems
                .filter((item) => item.is_completed)
                .map((item) => (
                  <TodoCard
                    key={item.id}
                    item={item}
                    todolistId={menu}
                    onRefresh={onRefresh}
                  />
                ))}
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </Layout>
  );
};

export default LayoutMain;
