import { useState } from 'react';
import { ConnectionTypes } from './connection-types';
import { ConnectionHeader } from './connection-types/connection-header';

export const ConnectionTypesSection = () => {
  const [visible, setVisible] = useState(true);
  const [searchVisible, setSearchVisible] = useState(false);
  return (
    <>
      <ConnectionHeader visible={visible} setVisible={setVisible} setSearchVisible={setSearchVisible} />
      <ConnectionTypes
        visible={visible}
        setVisible={setVisible}
        setSearchVisible={setSearchVisible}
        searchVisible={searchVisible}
      />
    </>
  );
};
