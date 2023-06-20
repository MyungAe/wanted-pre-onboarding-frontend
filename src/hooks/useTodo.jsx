import { useEffect, useState } from 'react';
import { Get } from '../api/api';
import { useNavigate } from 'react-router-dom';

function useTodo() {
  const [todos, setTodos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate('/signin');
    getTodo();
  }, []);

  const getTodo = () => {
    Get('/todos').then(response => {
      setTodos(response.data);
    });
  };

  return [todos, getTodo];
}

export default useTodo;
