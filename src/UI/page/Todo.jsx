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

  const updateTodo = async (id, todo, isCompleted) => {
    const response = await api.put(`/todos/${id}`, {
      todo,
      isCompleted: !isCompleted,
    });
    if (response.status === 200) getTodo();
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
        {todos.map(todo => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.isCompleted}
                  onClick={() =>
                    updateTodo(todo.id, todo.todo, todo.isCompleted)
                  }
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
