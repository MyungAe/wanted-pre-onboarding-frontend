import React, { useState } from 'react';
import api from '../../api/api';
import useInput from '../../hooks/useInput';

function Todo({ id, isCompleted, todo }) {
  const [isEditTodo, setIsEditTodo] = useState(false);

  const getTodo = async () => {
    await api.get('/todos');
  };

  const updateTodo = async (id, todo, isCompleted) => {
    const response = await api.put(`/todos/${id}`, {
      todo,
      isCompleted: !isCompleted,
    });
    if (response.status === 200) getTodo();
  };

  const deleteTodo = async id => {
    const response = await api.delete(`/todos/${id}`);
    if (response.status === 204) getTodo();
  };

  const [modifyTodo, modifyTodoHandler] = useInput(todo);

  return (
    <>
      <li>
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onClick={() => updateTodo(id, todo, isCompleted)}
          />
          {isEditTodo ? (
            <>
              <input
                data-testid="modify-input"
                value={modifyTodo}
                onChange={modifyTodoHandler}
              />
              <button
                data-testid="submit-button"
                onClick={() => {
                  api
                    .put(`/todos/${id}`, {
                      todo: modifyTodo,
                      isCompleted,
                    })
                    .then(response => {
                      if (response.status === 200) setIsEditTodo(false);
                    });
                }}
              >
                제출
              </button>
              <button
                data-testid="cancel-button"
                onClick={() => setIsEditTodo(false)}
              >
                취소
              </button>
            </>
          ) : (
            <>
              <span>{todo}</span>
              <button
                data-testid="modify-button"
                onClick={() => setIsEditTodo(true)}
              >
                수정
              </button>
              <button
                data-testid="delete-button"
                onClick={() => deleteTodo(id)}
              >
                삭제
              </button>
            </>
          )}
        </label>
      </li>
    </>
  );
}

export default Todo;
