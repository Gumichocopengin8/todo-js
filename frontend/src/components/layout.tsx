import React, { useState, useEffect } from 'react';
import { Layout, Menu, Empty, Tabs, Button } from 'antd';
import { PlusCircleTwoTone, DeleteFilled } from '@ant-design/icons';
import '../css/layout.css';
import TodoCard from './todoCard';
import TodoModal from './modal';
import { fetchTodoListsUsingGET, fetchTodoListItemsUsingGET, deleteTodoListUsingDELETE } from '../api/api';

const LayoutMain = () => {
  const { Sider, Content } = Layout;
  const { TabPane } = Tabs;
  const [lists, setLists] = useState([]);
  const [listItems, setListItems] = useState([]);
  const [todolistId, setTodolistId] = useState('1');
  const [modalTitle, setModalTitle] = useState('');
  const [refreshItems, setRefreshItems] = useState(false);
  const [refreshLists, setRefreshLists] = useState(false);
  const [isVisible, setVisible] = useState(false);

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
  }, [refreshLists]);

  useEffect(() => {
    let unmounted = false;
    const func = async () => {
      const todolistItems = await fetchTodoListItemsUsingGET(todolistId).catch((err) => {
        console.error(err);
        return [];
      });
      if (!unmounted) {
        setListItems(todolistItems);
      }
    };
    func();
    const cleanup = () => {
      unmounted = true;
    };
    return cleanup;
  }, [todolistId, refreshItems]);

  const onClickTodolistId = (e) => setTodolistId(e.key);
  const onRefreshItems = () => setRefreshItems((state) => !state);
  const onRefreshLists = () => setRefreshLists((state) => !state);
  const onModalInvisible = () => setVisible(false);
  const showCreateItemModal = () => {
    setVisible(true);
    setModalTitle('Create Item');
  };
  const showCreateListModal = () => {
    setVisible(true);
    setModalTitle('Create List');
  };
  const onDeleteList = async () => {
    await deleteTodoListUsingDELETE(todolistId).then(() => {
      setRefreshLists((state) => !state);
    });
  };

  return (
    <>
      <Layout style={{ height: '100vh' }}>
        <Sider>
          <div className="title">todo-js</div>
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']} onClick={onClickTodolistId} className="menu">
            {lists.map((list) => (
              <Menu.Item key={list.id}>
                <div className="flex">
                  {list.name}
                  <Button shape="circle" type="primary" icon={<DeleteFilled />} size="small" onClick={onDeleteList} />
                </div>
              </Menu.Item>
            ))}
          </Menu>
          <div className="create-list">
            <Button icon={<PlusCircleTwoTone />} shape="round" onClick={showCreateListModal}>
              Create List
            </Button>
          </div>
        </Sider>
        <Layout className="contents">
          <Content style={{ width: '88%' }}>
            {lists.length === 0 || !lists.map((list) => list.id).includes(Number(todolistId)) ? (
              <Empty description={<p>Creata a new list or Select a list if it exists</p>}>
                <Button type="primary" shape="round" onClick={showCreateListModal}>
                  Create List Now
                </Button>
              </Empty>
            ) : (
              <>
                <div>
                  <Button icon={<PlusCircleTwoTone />} shape="round" onClick={showCreateItemModal}>
                    Create Item
                  </Button>
                </div>
                <Tabs defaultActiveKey="1" centered>
                  <TabPane tab="Todo" key="1">
                    {listItems.length === 0 ? (
                      <Empty />
                    ) : (
                      listItems
                        .filter((item) => !item.is_completed)
                        .map((item) => (
                          <TodoCard key={item.id} item={item} todolistId={todolistId} onRefreshItems={onRefreshItems} />
                        ))
                    )}
                  </TabPane>
                  <TabPane tab="Done" key="2">
                    {listItems.length === 0 ? (
                      <Empty />
                    ) : (
                      listItems
                        .filter((item) => item.is_completed)
                        .map((item) => (
                          <TodoCard key={item.id} item={item} todolistId={todolistId} onRefreshItems={onRefreshItems} />
                        ))
                    )}
                  </TabPane>
                </Tabs>
              </>
            )}
          </Content>
        </Layout>
      </Layout>
      {isVisible ? (
        <TodoModal
          title={modalTitle}
          isVisible={isVisible}
          onModalInvisible={onModalInvisible}
          onRefreshItems={onRefreshItems}
          onRefreshLists={onRefreshLists}
          todolistId={todolistId}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default LayoutMain;
