import React, { useEffect } from 'react';
import useInput from '../../hooks/useInput';
import { useNavigate } from 'react-router-dom';
import api from '../../api/api';

function Signin() {
  const [id, IDHandler] = useInput('');
  const [pw, PWHandler] = useInput('');

  const navigate = useNavigate();

  const post = async () => {
    const response = await api.post('/auth/signin', {
      email: id,
      password: pw,
    });

    localStorage.setItem('access_token', response.data.access_token);

    if (response.status === 200) navigate('/todo');
  };

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
        value="로그인"
        data-testid="signin-button"
        onClick={onSubmitHandler}
      />
    </form>
  );
}

export default Signin;
