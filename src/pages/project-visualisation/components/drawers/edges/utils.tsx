import { PropertyTypes } from 'components/form/property/types';
import { Space } from 'antd';
import { getSingleData } from '../../../../data-sheet/components/table-section/node/utils';
import { CalendarOutlined } from '@ant-design/icons';
import { Text } from 'components/typography';
import { COLORS } from 'helpers/constants';
import dayjs from 'dayjs';
import { EdgeProperty } from 'types/edges';

const dataByType = (text: string, propertyType: PropertyTypes) => {
  switch (propertyType) {
    case PropertyTypes.Date:
      return (
        <Space>
          <CalendarOutlined /> <Text color={COLORS.PRIMARY.GRAY_DARK}>{dayjs(text).format('YYYY-MM-DD')}</Text>
        </Space>
      );
    case PropertyTypes.DateTime:
      return (
        <Space>
          <CalendarOutlined /> <Text color={COLORS.PRIMARY.GRAY_DARK}>{dayjs(text).format('YYYY-MM-DD HH:mm')}</Text>
        </Space>
      );
    case PropertyTypes.Text:
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return <Text color={COLORS.PRIMARY.GRAY_DARK}>{text}</Text>;
    default:
      return <Text color={COLORS.PRIMARY.GRAY_DARK}>{text}</Text>;
  }
};

export const getConnectionData = (item: EdgeProperty) => {
  const value = item.data.join('');

  if (!value) {
    return <Text color={COLORS.PRIMARY.GRAY}>(No Value)</Text>;
  }

  switch (item.edge_type_property_type) {
    case PropertyTypes.Date:
      return dataByType(value, PropertyTypes.Date);
    case PropertyTypes.DateTime:
      return dataByType(value, PropertyTypes.DateTime);
    case PropertyTypes.Text:
      return dataByType(value, PropertyTypes.Text);
    case PropertyTypes.Integer:
    case PropertyTypes.Decimal:
      return dataByType(value, PropertyTypes.Text);
    default:
      return getSingleData(item.data);
  }
};
