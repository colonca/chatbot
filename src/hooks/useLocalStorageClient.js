import { useEffect, useState } from 'react';
import { read, save } from '../services/localstorage';
import uuid from '../utils/uuid';

function useLocalStorageClient() {
  const [key, setKey] = useState(null);
  useEffect(() => {
    let id = read('CLIENT');
    if (!id) {
      id = uuid();
      save('CLIENT', id);
    }
    setKey(id);
  }, []);
  return { key };
}

export default useLocalStorageClient;
