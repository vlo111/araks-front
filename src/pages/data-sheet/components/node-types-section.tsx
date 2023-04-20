import { useState } from 'react';
import { NodeTypes } from './node-types';
import { NodesHeader } from './nodes-header';

export const NodeTypesSection = () => {
  const [visible, setVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <>
      <NodesHeader visible={visible} setVisible={setVisible} setSearchVisible={setSearchVisible} />
      <NodeTypes
        visible={visible}
        setVisible={setVisible}
        setSearchVisible={setSearchVisible}
        searchVisible={searchVisible}
      />
    </>
  );
};
