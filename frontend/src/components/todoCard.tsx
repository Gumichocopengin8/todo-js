import React, { useState } from 'react';
import { Card, Checkbox } from 'antd';
import '../css/todoCard.css';

const TodoCard = () => {
  const [isCheck, setIsCheck] = useState<boolean>(false);

  const onComplete = () => setIsCheck((state) => !state);

  return (
    <Card type="inner">
      <div className="card-content">
        Card title loooooongloooooongloooooong
        <Checkbox onChange={onComplete} />
      </div>
    </Card>
  );
};

export default TodoCard;
