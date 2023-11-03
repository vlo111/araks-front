import React from 'react';
import { Button, Result } from 'antd';
import { ReactComponent as ErrorPageimg } from './error.svg';

export const ErrorNotFound: React.FC = () => (
  <Result
    icon={<ErrorPageimg />}
    title={<span style={{ color: '#232f6a', fontSize: '48px', fontWeight: 600 }}>Page not found</span>}
    subTitle={
      <span style={{ color: '#232f6a', fontSize: '24px', fontWeight: 600 }}>
        Were sorry, the page you requested could not be found
      </span>
    }
    extra={
      <Button type="primary" style={{ fontWeight: '700', fontSize: '20px', width: '40%'}}>
        Back to homepage
      </Button>
    }
  ></Result>
);
