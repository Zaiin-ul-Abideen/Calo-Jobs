// import { useCallback } from 'react';

// const useFetchWrapper = () => {
//   const fetchWrapper = useCallback(async (url: string, options?: RequestInit) => {
//     const response = await fetch(url, options);
//     if (!response.ok) {
//       throw new Error('Network response was not ok');
//     }
//     return response.json();
//   }, []);

//   const get = useCallback((url: string) => fetchWrapper(url), [fetchWrapper]);
//   const post = useCallback((url: string, payload?: any) =>
//     fetchWrapper(url, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: payload ? JSON.stringify(payload) : undefined,
//     }), [fetchWrapper]);

//   return { get, post };
// };

// export default useFetchWrapper;


// src/hooks/useFetchWrapper.ts
const useFetchWrapper = () => {
  const get = async <T>(url: string): Promise<T> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  const post = async <T>(url: string, payload?: any): Promise<T> => {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: payload ? JSON.stringify(payload) : undefined,
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  };

  return { get, post };
};

export default useFetchWrapper;

