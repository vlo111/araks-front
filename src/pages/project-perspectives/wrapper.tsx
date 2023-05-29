import { Header } from './components/header';
import { PerspectiveWrapper } from './style';
import { Space } from 'antd';
import { Content } from './components/collapse';

export const Wrapper = () => {
  return (
    <PerspectiveWrapper>
      <Header />
      <Space>
        <Content />
      </Space>
    </PerspectiveWrapper>
  );
};
