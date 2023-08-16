import { useGetHelp } from '../../../../api/help/use-get-help-data';
import { HelpChart } from '../chart';
import { useState } from 'react';

import { DrawerComponent } from './drawer';
import { HelpContainer } from './container';
import { DataFormat } from '../helpers/data.format';
import { AllDataHelp } from '../../../../types/node';
import { HelpNodeType } from '../type';

export const HelpVisualization = () => {
  const [node, setNode] = useState<string>('');
  const [open, setOpen] = useState<boolean>(false);
  const [enabled, setEnabled] = useState<boolean>(true);
  const [graph, setGraph] = useState<boolean>(false);
  const { data } = useGetHelp(node, {
    enabled,
    onSuccess: () => {
      setNode('');
      setEnabled(false);
    },
  });

  const dataHelpList = data as AllDataHelp[];

  if (dataHelpList.length && !graph) {
    HelpChart(DataFormat(dataHelpList), setNode, setOpen, setGraph, setEnabled);
  }

  return (
    <>
      <HelpContainer id={'aH7j3A9sa'} />
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
