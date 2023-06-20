import React, { useState } from 'react';
import { Delete, Put } from '../../api/api';
import useInput from '../../hooks/useInput';

function Todo({ id, isCompleted, todo }) {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [isEditTodo, setIsEditTodo] = useState(false);
  const [isFinish, setIsFinish] = useState(isCompleted);
  const [isDelete, setIsDelete] = useState(false);

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
              onClick={() => {
                Put(`/todos/${id}`, {
                  todo,
                  isCompleted: !isCompleted,
                }).then(() => setIsFinish(!isFinish));
              }}
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
                    Put(`/todos/${id}`, {
                      todo: modifyTodo,
                      isCompleted: !isCompleted,
                    }).then(() => {
                      setCurrentTodo(modifyTodo);
                      setIsEditTodo(false);
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
                  onClick={() => {
                    Delete(`/todos/${id}`).then(() => {
                      setIsDelete(true);
                    });
                  }}
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
