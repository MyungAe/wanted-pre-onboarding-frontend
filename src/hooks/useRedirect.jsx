import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function useRedirect(URL) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('access_token')) navigate(URL);
  }, []);

  return navigate;
}

export default useRedirect;
