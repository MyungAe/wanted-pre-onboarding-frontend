import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useInput from '../../hooks/useInput';
import Todo from '../components/Todo';

function TodoList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate('/signin');
  }, []);

  const [newTodo, newTodoHandler] = useInput('');

  const createTodo = async () => {
    const response = await api.post('/todos', { todo: newTodo });

    if (response.status === 201) getTodo();
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    createTodo();
  };

  const [todos, setTodos] = useState([]);

  useEffect(() => {
    getTodo();
  }, []);

  const getTodo = async () => {
    const response = await api.get('/todos');
    setTodos(response.data);
  };

  return (
    <>
      <form>
        <input
          type="text"
          id="todoInput"
          onChange={newTodoHandler}
          data-testid="new-todo-input"
        />
        <input
          type="submit"
          value="추가"
          onClick={onSubmitHandler}
          data-testid="new-todo-add-button"
        />
      </form>
      <ul>
        {todos.map(obj => {
          return <Todo {...obj} />;
        })}
      </ul>
    </>
  );
}

export default TodoList;
