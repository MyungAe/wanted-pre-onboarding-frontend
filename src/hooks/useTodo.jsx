import { useEffect, useState } from 'react';
import { Get } from '../api/api';

function useTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
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
