import { Col } from 'antd';
import styled from 'styled-components';
import { useState } from 'react';
import { BackMode } from './back-mode';
import { EditMode } from './edit-mode';

const Wrapper = styled(Col)`
  background: #f7f7f7;
  box-shadow: inset -10px 10px 10px rgba(111, 111, 111, 0.1);
  padding: 2rem 2rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  .ant-form {
    width: 100%;
    padding: 0 2rem;

    button {
      max-width: 450px;
      min-width: 100px;
      margin: 0 auto;
      display: block;
    }

    textarea {
      max-height: 150px;
    }
  }
`;

export const EditWrapper = () => {
  const [isEditPassword, setIsEditPassword] = useState(false);

  const onBack = () => setIsEditPassword(!isEditPassword)

  return (
    <Wrapper span={15} xs={24} sm={24} md={15}>
      {isEditPassword ? <BackMode onBack={onBack}/> : <EditMode onBack={onBack} />}
    </Wrapper>
  );
};
