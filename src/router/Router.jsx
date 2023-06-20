import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from '../UI/page/Signup';
import Signin from '../UI/page/Signin';
import Todo from '../UI/page/Todo';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/signup"
          element={<Signup />}
        />
        <Route
          path="/signin"
          element={<Signin />}
        />
        <Route
          path="/todo"
          element={<Todo />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
