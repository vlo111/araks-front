import { Button } from 'antd';
import styled from 'styled-components';
import { EditPassword } from './form/password';
import { LeftCircleOutlined } from '@ant-design/icons';
import { FC } from 'react';

const Mode = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;

  button {
    width: 150px !important;
    color: #808080;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 700;
    font-size: 17px;
    gap: 0.5rem;

    svg {
      background: white;
      border-radius: 50px;
      width: 1.5rem;
      height: 1.5rem;

      path:last-child {
        fill: white;
      }
    }
  }
`;

export const BackMode: FC<{ onBack: VoidFunction }> = ({ onBack }) => (
  <>
    <Mode>
      <Button block icon={<LeftCircleOutlined />} type="text" onClick={onBack}>
        B A C K
      </Button>
    </Mode>
    <EditPassword />
  </>
);
