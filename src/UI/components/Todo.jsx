import React, { useState } from 'react';
import api from '../../api/api';
import useInput from '../../hooks/useInput';
import { isSuccess } from '../../util/validations';

function Todo({ id, isCompleted, todo }) {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [isFinish, setIsFinish] = useState(isCompleted);
  const [isDelete, setIsDelete] = useState(false);

  const updateTodo = async (id, todo, isCompleted) => {
    const response = await api.put(`/todos/${id}`, {
      todo,
      isCompleted: !isCompleted,
    });
    if (isSuccess(response.status)) setIsFinish(!isFinish);
  };

  const deleteTodo = async id => {
    const response = await api.delete(`/todos/${id}`);
    console.log(response, isSuccess(response.status));
    if (isSuccess(response.status)) setIsDelete(true);
  };

  const [modifyTodo, modifyTodoHandler] = useInput(todo);

  return (
    <>
      {isDelete ? (
        <></>
      ) : (
        <li>
          <label>
            <input
              type="checkbox"
              defaultChecked={isFinish}
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
                        if (isSuccess(response.status)) {
                          setCurrentTodo(modifyTodo);
                          setIsEditTodo(false);
                        }
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
                <span>{currentTodo}</span>
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
      )}
    </>
  );
}

export default Todo;
