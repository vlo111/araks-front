import { GridConnectionButton } from 'components/button';
import { GridConnectionPopover } from 'components/popover';
import { VerticalSpace } from 'components/space/vertical-space';

import { ReactComponent as Connection } from 'components/icons/connection.svg';
import { NodeDataResponse } from 'types/node';
import { getConnectionFormName } from 'components/form/type/connection-type';

type Props = {
  itemName: string;
  row: NodeDataResponse;
};

const getPopupContainer = (triggerNode: HTMLElement) => {
  return document.getElementById('custom-popup-container') as HTMLElement;
};

export const ConnectionColumnValue = ({ itemName, row }: Props) => {
  const filteredData = row.edges
    .concat(row.edges_in)
    .filter((edge) => getConnectionFormName(edge.edgeTypes.name, edge.edgeTypes.id) === itemName);

  return (
    <div id="custom-popup-container">
      <GridConnectionPopover
        overlayStyle={{ padding: '0 16px', width: '100%', zIndex: '5' }}
        content={
          <div>
            <VerticalSpace>
              {filteredData.map((connection) => (
                <GridConnectionButton
                  type="text"
                  size="small"
                  key={connection.id}
                  backgroundColor={
                    row.id === connection.source.id
                      ? connection.target.nodeType.color
                      : connection.source.nodeType.color
                  }
                  block
                  icon={<Connection />}
                >
                  {row.id === connection.source.id ? connection.target.name : connection.source.name}
                </GridConnectionButton>
              ))}
            </VerticalSpace>
          </div>
        }
        color={`${row.nodeType.color}20`}
        getPopupContainer={getPopupContainer}
        align={{ offset: [0, 0] }}
      >
        {filteredData.length ? (
          <GridConnectionButton backgroundColor={row.nodeType.color} block icon={<Connection />} size="small">
            {`${
              row.id === filteredData[0].source.id
                ? filteredData[0].target.nodeType.name
                : filteredData[0].source.nodeType.name
            }`}
          </GridConnectionButton>
        ) : (
          <></>
        )}
      </GridConnectionPopover>
    </div>
  );
};
