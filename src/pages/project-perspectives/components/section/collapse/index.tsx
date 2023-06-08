import { PerspectiveCollapse } from 'components/collapse/perspective-collapse';
import { usePanels } from './use-panels';
import { useEffect, useRef, useState } from 'react';
import { IResponsePerspectiveData } from "api/types";

export const Collapse = ({ panels }: { panels: IResponsePerspectiveData[] }) => {
  const isInitialMount = useRef(true);
  const [activeKey, setActiveKey] = useState<string>('');
  const onChange = (key: string | string[]) => {
    if (key.length) setActiveKey(key[0]);
  };

  const { list } = usePanels(panels);

  const props = {
    panels: list,
    activeKey,
    onChange,
  };

  useEffect(() => {
    if (isInitialMount.current && panels.length) {
      isInitialMount.current = false;
      setActiveKey(panels.find((a) => a.status === 'main')?.id ?? '');
    }
  }, [panels]);

  return <PerspectiveCollapse {...props} />;
};
