import React, { useEffect, useState } from 'react';
import { Header } from './header';
import { PerspectiveWrapper } from './style';
import { Content } from './content/collapse';
import { PanelDescription, PanelHeader } from './content/add-panel';
import { CollapsePanelProps } from 'antd';
import { list } from "./fake-data";

interface PropsPanel extends CollapsePanelProps {
  children: React.ReactNode;
}

export const Section = () => {
  const [isNewPerspective, setIsNewPerspective] = useState<boolean>(false);

  const addPanel = {
    header: <PanelHeader />,
    className: 'add-panel',
    key: 'add',
    children: <PanelDescription setIsNewPerspective={(item) => setIsNewPerspective(false)} />,
  };

  const [panels, setPanels] = useState<PropsPanel[]>(list);

  useEffect(() => {
    setPanels(!isNewPerspective ? list : [...list, addPanel]);
    /* eslint-disable */
  }, [isNewPerspective]);

  return (
    <PerspectiveWrapper>
      <Header setIsNewPerspective={(item) => setIsNewPerspective(true)} />
      <Content isNewPerspective={isNewPerspective} panels={panels} />
    </PerspectiveWrapper>
  );
};
