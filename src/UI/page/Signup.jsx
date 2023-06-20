import React, { useEffect } from 'react';
import useInput from '../../hooks/useInput';
import { isCorrectAccount } from '../../util/validations';
import { Post } from '../../api/api';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [id, IDHandler] = useInput('');
  const [pw, PWHandler] = useInput('');

  const navigate = useNavigate();

  const onSubmitHandler = e => {
    e.preventDefault();
    Post('/auth/signup', {
      email: id,
      password: pw,
    })
      .then(() => {
        navigate('/signin');
      })
      .catch(error => {
        alert(error.response.data.message);
      });
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
