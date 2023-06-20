import React, { useEffect } from 'react';
import useInput from '../../hooks/useInput';
import { isCorrectAccount, isSuccess } from '../../util/validations';
import api from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [id, IDHandler] = useInput('');
  const [pw, PWHandler] = useInput('');

  const navigate = useNavigate();

  const post = async () =>
    await api
      .post('/auth/signup', {
        email: id,
        password: pw,
      })
      .then(response => {
        if (isSuccess(response.status)) navigate('/signin');
      })
      .catch(error => {
        alert(error.response.data.message);
      });

  const onSubmitHandler = e => {
    e.preventDefault();
    post();
  };

  useEffect(() => {
    if (localStorage.getItem('access_token')) navigate('/todo');
  }, []);

  return (
    <form>
      <div>
        <label htmlFor="id">아이디</label>
        <input
          type="email"
          id="id"
          value={id}
          onChange={IDHandler}
          data-testid="email-input"
        />
      </div>
      <div>
        <label htmlFor="pw">패스워드</label>
        <input
          type="password"
          id="pw"
          value={pw}
          onChange={PWHandler}
          data-testid="password-input"
        />
      </div>
      <input
        type="submit"
        value="회원가입"
        data-testid="signup-button"
        onClick={onSubmitHandler}
        disabled={isCorrectAccount(id, pw)}
      />
    </form>
  );
}

export default Signup;
