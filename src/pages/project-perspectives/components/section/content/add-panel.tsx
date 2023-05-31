import { Input } from 'antd';
import { Accept } from './footers/accept';
import TextArea from 'antd/es/input/TextArea';
import React from 'react';

type Props = React.FC<{ setIsNewPerspective: React.Dispatch<React.SetStateAction<boolean>> }>;

export const PanelDescription: Props = ({ setIsNewPerspective }) => {
  return (
    <>
      <TextArea>asdqwe</TextArea>
      <div onClick={() => {setIsNewPerspective(false)}}><Accept  /></div>
    </>
  );
};

export const PanelHeader = () => {
  return (
    <div onClick={(e) => e.stopPropagation()}>
      <Input className="add-perspective" value={'New Perspective'} />
    </div>
  );
};
