import React from 'react';
import { Button, Result } from 'antd';
import { ReactComponent as ErrorServerimg } from './servererror.svg';
import styled from 'styled-components';

const Container = styled(Result)`
  &.ant-result .ant-result-icon {
    display: none;
  }
  &.ant-result {
    padding: 0px 8px;
  }
`;

export const ErrorServer: React.FC = () => (
  <Container
    title={<span style={{ color: '#2c447d', fontSize: 'clamp(1rem, 12vw, 50rem)' }}>500</span>}
    subTitle={<span style={{ color: '#191e3a', fontSize: 'clamp(1rem, 5vw, 50rem)' }}>Internet server error</span>}
    extra={
      <>
        <ErrorServerimg style={{ width: '80%', paddingRight: '20%' }} />
        <Button type="primary" style={{ fontWeight: '700', fontSize: '20px', width: '40%' }}>
          Back to homepage
        </Button>
      </>
    }
  ></Container>
);
