import React from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { router } from './router';
import { RouterProvider } from 'react-router-dom';
import { ConfigProvider } from 'antd';
import { antTheme } from './helpers/ant-theme';

import './index.css';

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
      theme={antTheme}
    >
      <QueryClientProvider client={queryClient}>
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
