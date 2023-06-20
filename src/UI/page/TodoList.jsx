import React from 'react';
import useInput from '../../hooks/useInput';
import Todo from '../components/Todo';
import useTodo from '../../hooks/useTodo';
import { Post } from '../../api/api';
import useRedirect from '../../hooks/useRedirect';

function TodoList() {
  useRedirect('/signin');

  const [newTodo, newTodoHandler] = useInput('');

  const onSubmitHandler = e => {
    e.preventDefault();
    Post('/todos', { todo: newTodo }).then(() => getTodo());
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
