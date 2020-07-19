import { useEffect, useState } from 'react';

async function fetchApi(endpoint = '') {
  if (endpoint === '') {
    return;
  }

  const response = await fetch(endpoint);
  return await response.json();
}

export function useFetchApi(endpoint = '') {
  const [response, setResponse] = useState([]);

  useEffect(() => {
    if (endpoint === '') {
      return;
    }

    if (!response.length) {
      fetchApi(endpoint)
        .then((data) => setResponse(data));
    }
  }, [endpoint, response]);

  return [response];
}
