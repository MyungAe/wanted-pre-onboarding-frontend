import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';
import useInput from '../../hooks/useInput';
import Todo from '../components/Todo';
import { isSuccess } from '../../util/validations';
import useTodo from '../../hooks/useTodo';

function TodoList() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate('/signin');
  }, []);

  const [newTodo, newTodoHandler] = useInput('');

  const createTodo = async () => {
    const response = await api.post('/todos', { todo: newTodo });
    if (isSuccess(response.status)) getTodo();
  };

  const onSubmitHandler = e => {
    e.preventDefault();
    createTodo();
  };

  const [todos, getTodo] = useTodo();

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
          return (
            <Todo
              {...obj}
              key={obj.id}
            />
          );
        })}
      </ul>
    </>
  );
}

export default TodoList;
