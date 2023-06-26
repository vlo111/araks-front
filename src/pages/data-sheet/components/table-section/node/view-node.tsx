import { Image } from 'antd';
import { GridConnectionButton } from 'components/button';

import { Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { COLORS } from 'helpers/constants';
import { useMemo } from 'react';
import { VerticalSpace } from './../../../../../components/space/vertical-space';
import { getRowData, groupedData } from './utils';
import { ReactComponent as Connection } from 'components/icons/connection.svg';

export const VIewNode = () => {
  const { state: selectedView } = useViewDatasheet();
  const groupedDataList = useMemo(
    () => (selectedView?.edges ? Object.entries(groupedData(selectedView.edges)) : []),
    [selectedView?.edges]
  );
  // eslint-disable-next-line no-console
  console.log('groupedDataList', groupedDataList);

  return (
    <VerticalSpace>
      {selectedView?.default_image && (
        <Image src={selectedView?.default_image} width={161} height={127} style={{ borderRadius: '4px' }} />
      )}
      <VerticalSpace>
        <Text color={COLORS.PRIMARY.BLUE}>name</Text>
        <Text>{selectedView?.name}</Text>
      </VerticalSpace>
      {selectedView?.properties ? (
        selectedView.properties.map((data) => {
          return (
            <VerticalSpace key={data.id}>
              <Text color={COLORS.PRIMARY.BLUE}>{data.nodeTypeProperty.name}</Text>
              {getRowData(data)}
            </VerticalSpace>
          );
        })
      ) : (
        <></>
      )}
      {groupedDataList.map(([index, item]) => (
        <VerticalSpace key={index}>
          <Text color={COLORS.PRIMARY.BLUE}>{index}</Text>
          {item.map((row) => (
            <GridConnectionButton
              key={row.id}
              type="text"
              size="small"
              backgroundColor={row.nodes.nodeType.color}
              block
              icon={<Connection />}
            >
              {row.nodes.nodeType.name}
            </GridConnectionButton>
          ))}
        </VerticalSpace>
      ))}
    </VerticalSpace>
  );
};
