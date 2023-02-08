import React from 'react';
import { QueryClientProvider } from 'react-query';
import { QueryClient } from 'react-query/types/core';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function App() {

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#232F6A',
        },
      }}
    >
      <QueryClientProvider client={queryClient}>

        <RouterProvider router={router} />

      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
