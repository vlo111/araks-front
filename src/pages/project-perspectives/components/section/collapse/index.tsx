import { useEffect, useRef, useState, useMemo } from 'react';
import { IResponsePerspectiveData } from 'api/types';
import { useGetPerspective } from 'api/perspective/use-get-perspective';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { switchTypePermission } from 'components/layouts/components/schema/helpers/utils';
import { PerspectiveCollapse } from 'components/collapse/perspective-collapse';
import { usePanels } from './use-panels';
import { useParams } from 'react-router-dom';

export const Collapse = ({ panels }: { panels: IResponsePerspectiveData[] }) => {
  const params = useParams();

  const { graph } = useSchema();

  const { list } = usePanels(panels);

  const mainId = useMemo(() => panels.find((a) => a.status === 'main')?.id, [panels]);

  const isInitialMount = useRef(true);

  const [activeKey, setActiveKey] = useState<string>(mainId || '');

  useGetPerspective(activeKey, {
    enabled: !!activeKey,
    onSuccess: (data) => {
      if (graph) {
        graph.getNodes().forEach((node) => {
          const hasType = mainId === activeKey || data.nodeType.some(({ project_node_type_id: id }) => id === node.id);
          switchTypePermission(node, !hasType);
        });
        localStorage.setItem(
          'selected-perspective',
          JSON.stringify({
            perspectiveId: data.id,
            project_id: params.id ?? '',
          })
        );
      }
    },
  });

  const onChange = (key: string | string[]) => {
    if (key.length) {
      setActiveKey(key[0]);
    }
  };

  useEffect(() => {
    if (isInitialMount.current && panels.length) {
      isInitialMount.current = false;
      setActiveKey(panels.find((a) => a.status === 'main')?.id ?? '');
    }
  }, [panels]);

  return <PerspectiveCollapse panels={list} activeKey={activeKey} onChange={onChange} />;
};
