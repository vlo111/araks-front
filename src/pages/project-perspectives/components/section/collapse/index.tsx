import { PerspectiveCollapse } from 'components/collapse/perspective-collapse';
import { usePanels } from './use-panels';
import { ResponsePerspectiveData } from 'api/perspective/use-get-perspectives';
import { useEffect, useState } from 'react';

export const Collapse = ({ panels }: { panels: ResponsePerspectiveData[] }) => {
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
    setActiveKey(panels.find((a) => a.status === 'main')?.id ?? '');
  }, [panels]);

  return (<PerspectiveCollapse {...props} />);
};
