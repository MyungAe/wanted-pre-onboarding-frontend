import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate('/signin');
  }, []);

  return <div>Todo</div>;
}

export default Todo;
