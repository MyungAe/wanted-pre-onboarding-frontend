import React from 'react';
import useInput from '../../hooks/useInput';
import { isCorrectAccount } from '../../util/validations';

function Signup() {
  const [id, IDHandler] = useInput('');
  const [pw, PWHandler] = useInput('');

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
        disabled={isCorrectAccount(id, pw)}
      />
    </form>
  );
}

export default Signup;
