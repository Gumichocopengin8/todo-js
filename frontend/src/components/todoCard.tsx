import React, { useState } from 'react';
import { Card, Checkbox, Button } from 'antd';
import { DeleteTwoTone } from '@ant-design/icons';
import '../css/todoCard.css';
import { updateTodoListItemUsingPUT, deleteTodoListItemUsingDELETE } from '../api/api';

const TodoCard = ({ item, todolistId, onRefreshItems }) => {
  const [isCheck, setIsCheck] = useState<boolean>(item.is_completed);

  const onComplete = async () => {
    await updateTodoListItemUsingPUT(todolistId, item.id, !isCheck)
      .then(() => {
        setIsCheck((state) => !state);
        onRefreshItems();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDeleteItem = async () => {
    await deleteTodoListItemUsingDELETE(todolistId, item.id)
      .then(() => {
        onRefreshItems();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <Card>
      <div className="card-content">
        <div className="card-content">
          <Checkbox onChange={onComplete} checked={isCheck} />
          <div style={{ paddingLeft: '1rem', wordBreak: 'break-all' }}>{item.name}</div>
        </div>
        <Button icon={<DeleteTwoTone />} shape="round" onClick={onDeleteItem} />
      </div>
    </Card>
  );
};

export default TodoCard;
