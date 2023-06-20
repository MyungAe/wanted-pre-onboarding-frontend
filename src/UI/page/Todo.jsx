import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useInput from '../../hooks/useInput';

function Todo() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate('/signin');
  }, []);

  const [newTodo, newTodoHandler] = useInput('');

  const createTodo = async () => {
    const response = await api.post('/todos', { todo: newTodo });
    console.log(response);
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
        />
        <input
          type="submit"
          value="추가"
          onClick={onSubmitHandler}
        />
      </form>
      <ul>
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.ischecked}
                />
                <span>{todo.todo}</span>
              </label>
            </li>
          );
        })}
      </ul>
    </>
  );
}

export default Todo;
