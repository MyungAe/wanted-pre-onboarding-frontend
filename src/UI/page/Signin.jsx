import React from 'react';
import useInput from '../../hooks/useInput';
import { Post } from '../../api/api';
import useRedirect from '../../hooks/useRedirect';
import Navigate from '../components/navigate';

function Signin() {
  const [id, IDHandler] = useInput('');
  const [pw, PWHandler] = useInput('');

  const navigate = useRedirect('/todo');

  const onSubmitHandler = e => {
    e.preventDefault();
    Post('/auth/signin', {
      email: id,
      password: pw,
    }).then(response => {
      localStorage.setItem('access_token', response.data.access_token);
      navigate('/todo');
    });
  };

  return (
    <>
      <Navigate />
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
    </>
  );
}

export default Signin;
