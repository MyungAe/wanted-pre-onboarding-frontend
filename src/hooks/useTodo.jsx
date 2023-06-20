import { useEffect, useState } from 'react';
import api from '../api/api';

function useTodo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    const response = await api.get('/todos');
    setTodos(response.data);
  };

  return [todos, getTodo];
}

export default useTodo;
