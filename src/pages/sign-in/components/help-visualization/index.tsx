import { useGetHelp } from '../../../../api/help/use-get-help-data';
import { HelpChart } from '../chart';
import React, { useEffect, useState } from 'react';

import { DrawerComponent } from './drawer';
import { HelpContainer } from './container';
import { DataFormat } from '../helpers/data.format';
import { AllDataHelp } from '../../../../types/node';
import { HelpNodeType } from '../type';
import { Graph } from '@antv/g6';

export const HelpVisualization = () => {
  const [node, setNode] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [graph, setGraph] = useState<{ destroy: () => void; graph: Graph }>();
  const ref: React.MutableRefObject<HTMLDivElement | null> = React.useRef(null);
  const { data } = useGetHelp(node, {
    enabled,
    onSuccess: () => {
      setNode('');
      setEnabled(false);
    },
  });

  const dataHelpList = data as AllDataHelp[];

  useEffect(() => {
    if (dataHelpList.length && !graph?.graph && ref.current) {
      setGraph(HelpChart(DataFormat(dataHelpList), setNode, setOpen, setEnabled, ref.current as HTMLDivElement));
    }
  }, [dataHelpList, graph?.graph]);

  return (
    <>
      <HelpContainer ref={ref} />
      {open && (
        <DrawerComponent
          open={open}
          setOpen={setOpen}
          node={data as HelpNodeType}
          setNode={setNode}
          setEnabled={setEnabled}
        />
      )}
    </>
  );
};
