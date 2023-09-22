import { useEffect, useRef, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPerspective } from 'api/perspective/use-get-perspective';
import { useSchema } from 'components/layouts/components/schema/wrapper';
import { PerspectiveCollapse } from 'components/collapse/perspective-collapse';
import { usePanels } from './use-panels';
import { setPerspectiveData, switchTypePermission } from 'components/layouts/components/schema/helpers/utils';
import { IResponsePerspectiveData } from 'api/types';
import { initPerspectiveEvents } from 'components/layouts/components/schema/container/initial/events';

let clickEventAttached = false;

export const Collapse = ({ panels }: { panels: IResponsePerspectiveData[] }) => {
  const params = useParams();
  const { graph, setPerspectiveInfo } = useSchema() || {};
  const { list } = usePanels(panels);
  const mainId = useMemo(() => panels.find((a) => a.status === 'main')?.id, [panels]);
  const isInitialMount = useRef(true);
  const [activeKey, setActiveKey] = useState<string>(mainId || '');

  const attachClickEvent = () => {
    if (clickEventAttached) return; // Don't attach the event multiple times
    clickEventAttached = true;

    initPerspectiveEvents(graph, setPerspectiveInfo);
  };

  const detachClickEvent = () => {
    if (!clickEventAttached) return; // Event not attached, no need to detach
    clickEventAttached = false;

    graph.off('node:click');
  };

  useGetPerspective(activeKey, {
    enabled: !!activeKey,
    onSuccess: (data) => {
      if (!graph) return;

      const nodes = graph.getNodes();
      const typesLength = mainId === activeKey ? nodes.length : data.nodeType.length;

      const propertiesLength =
        mainId === activeKey
          ? nodes.flatMap((n) => n.ports.items).filter((p) => p.attrs?.portTypeLabel.text !== 'connection').length
          : nodes
              .flatMap((n) => (data.nodeType.some(({ project_node_type_id: id }) => id === n.id) ? n.ports.items : []))
              .filter((p) => p.attrs?.portTypeLabel.text !== 'connection').length;

      nodes.forEach((node) => {
        const hasType = mainId === activeKey || data.nodeType.some(({ project_node_type_id: id }) => id === node.id);
        switchTypePermission(node, !hasType);
      });

      setPerspectiveInfo({ typesLength, propertiesLength });

      if (mainId !== activeKey) {
        setPerspectiveData({ perspectiveId: data.id, project_id: params.id || '' });
        attachClickEvent(); // Attach the click event when needed
      } else {
        detachClickEvent(); // Detach the click event when not needed
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
      setActiveKey(panels.find((a) => a.status === 'main')?.id || '');
    }
  }, [panels]);

  return <PerspectiveCollapse panels={list} activeKey={activeKey} onChange={onChange} />;
};
