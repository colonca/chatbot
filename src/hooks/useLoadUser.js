import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getToken } from '../utils/auth-helper';
import AuthServices from '../services/AuthServices';
import login from '../redux/actions/login';

function useLoadUser() {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUser = async () => {
      if (!getToken()) {
        return;
      }
      try {
        const { status, result } = await AuthServices.whoami();
        if (status === 200) dispatch(login(result));
      } catch (err) {
        setError(err);
      }
    };
    loadUser();
  }, [dispatch]);

  return { error };
}

export default useLoadUser;
