import { GridConnectionButton } from 'components/button';
import { GridConnectionPopover } from 'components/popover';
import { VerticalSpace } from 'components/space/vertical-space';

import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { NodeDataResponse, NodeEdges } from 'types/node';

type Props = {
  item: NodeEdges;
  row: NodeDataResponse;
};

const getPopupContainer = (triggerNode: HTMLElement) => {
  return document.getElementById('custom-popup-container') as HTMLElement;
};

export const ConnectionColumnValue = ({ item, row }: Props) => {
  const filteredData = row.edges.filter((edge) => edge.edgeTypes.name === item.edgeTypes.name);

  return (
    <div id="custom-popup-container">
      <GridConnectionPopover
        overlayStyle={{ padding: '0 16px', width: '100%' }}
        content={
          <div style={{ margin: '16px' }}>
            <VerticalSpace>
              {filteredData.map((connection) => (
                <GridConnectionButton
                  type="text"
                  size="small"
                  key={connection.id}
                  backgroundColor={connection.nodes.nodeType.color}
                  block
                  icon={<Connection />}
                >
                  {connection.nodes.nodeType.name}
                </GridConnectionButton>
              ))}
            </VerticalSpace>
          </div>
        }
        color={`${row.nodeType.color}20`}
        getPopupContainer={getPopupContainer}
        align={{ offset: [0, -10] }}
      >
        <GridConnectionButton backgroundColor={row.nodeType.color} block icon={<Connection />} size="small">
          {`Connection (${filteredData.length})`}
        </GridConnectionButton>
      </GridConnectionPopover>
    </div>
  );
};
