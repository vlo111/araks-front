import React from 'react';
import { Button, Result } from 'antd';
import { ReactComponent as ErrorServerimg } from './servererror.svg';
import styled from 'styled-components';

const Container = styled(Result)`
  &.ant-result .ant-result-icon {
    display: none;
  }
  &.ant-result,
  .ant-result-content {
    padding: 0;
  }
`;

export const ErrorServer: React.FC = () => (
  <Container>
    <Result
      title={<span style={{ color: '#2c447d', fontSize: '200px' }}>500</span>}
      subTitle={<span style={{ color: '#191e3a', fontSize: '80px' }}>Internet server error</span>}
      extra={
        <>
          <ErrorServerimg style={{ width: '100%', paddingRight: '10%' }} />
          <Button type="primary" style={{ fontWeight: '700', fontSize: '20px', width: '40%' }}>
            Back to homepage
          </Button>
        </>
      }
    ></Result>
  </Container>
);
