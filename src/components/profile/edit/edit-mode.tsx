import { Button } from 'antd';
import styled from 'styled-components';
import { EditProfile } from './form/profile-edit-info';
import { FC } from 'react';

const Mode = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;

  button {
    margin-right: 2rem;
    border: 2px solid #999999;
    border-radius: 4px;
    width: 150px !important;
  }
`;

export const EditMode: FC<{ onBack: VoidFunction }> = ({ onBack }) => (
  <>
    <Mode>
      <Button block type="text" onClick={onBack}>
        Edit Password
      </Button>
    </Mode>
    <EditProfile />
  </>
);
