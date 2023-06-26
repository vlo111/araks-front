import { Image } from 'antd';

import { Text } from 'components/typography';
import { useViewDatasheet } from 'context/datasheet-view-vontext';
import { COLORS } from 'helpers/constants';
import { VerticalSpace } from './../../../../../components/space/vertical-space';
import { getRowData } from './utils';

export const VIewNode = () => {
  const { state: selectedView } = useViewDatasheet();
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
    </VerticalSpace>
  );
};
