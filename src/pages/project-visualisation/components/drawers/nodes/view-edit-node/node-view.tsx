import { Text } from 'components/typography';
import { VerticalSpace } from 'components/space/vertical-space';
import { getRowData } from 'pages/data-sheet/components/table-section/node/utils';
import { COLORS } from 'helpers/constants';
import { FormInstance, Image } from 'antd';
import React from 'react';
import { NodePropertiesValues } from 'types/node';

interface IProps {
  formFata: FormInstance<{ name: string; icon: string }>;
  properties: NodePropertiesValues[] | undefined;
}

export const ViewNode: React.FC<IProps> = ({ formFata, properties }) => {
  const name = formFata.getFieldValue('name');
  const img = formFata.getFieldValue('node_icon');

  return (
    <VerticalSpace>
      {img && (
        <Image src={img[0]?.response?.data?.uploadPath} width={161} height={127} style={{ borderRadius: '4px' }} />
      )}
      <VerticalSpace>
        <Text color={COLORS.PRIMARY.BLUE}>name</Text>
        <Text>{name && name[0]}</Text>
      </VerticalSpace>
      {properties ? (
        properties.map((d) => {
          return (
            <VerticalSpace key={d.id}>
              <div color={COLORS.PRIMARY.BLUE}>{d.nodeTypeProperty.name}</div>
              {getRowData(d)}
            </VerticalSpace>
          );
        })
      ) : (
        <></>
      )}
    </VerticalSpace>
  );
};
