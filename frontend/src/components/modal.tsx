import React, { useState } from 'react';
import { Modal, Input } from 'antd';
import { createTodoListUsingPOST, createTodoListItemUsingPOST } from '../api/api';

const TodoModal = ({ title, isVisible, onModalInvisible, onRefreshItems, onRefreshLists, todolistId }) => {
  const [name, setName] = useState('');

  const onOK = async () => {
    if (title === 'Create Item') {
      // create list item
      await createTodoListItemUsingPOST(todolistId, name)
        .then(() => {
          onRefreshItems();
          onModalInvisible();
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      // create todo list
      await createTodoListUsingPOST(name)
        .then(() => {
          onRefreshLists();
          onModalInvisible();
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const onChangeName = (e) => setName(e.target.value);

  return (
    <>
      <Modal title={title} visible={isVisible} onOk={onOK} onCancel={onModalInvisible}>
        {title === 'Create Item' ? (
          <Input placeholder="Name" onChange={onChangeName} />
        ) : (
          <Input placeholder="Name" onChange={onChangeName} maxLength={10} />
        )}
      </Modal>
    </>
  );
};

export default TodoModal;
