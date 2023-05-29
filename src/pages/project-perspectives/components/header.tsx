import { Text } from 'components/typography';
import { ReactComponent as AddSvg } from './icons/add.svg';
import { ReactComponent as DuplicateSvg } from './icons/duplicate.svg';
import { Col, Row } from 'antd';

const centerStyle = { display: 'flex', alignItems: 'center' };

export const Header = () => (
  <Row style={{ width: '100%' }} gutter={4}>
    <Col offset={1} style={centerStyle}>
      <Text style={{ fontSize: '20px' }}>Perspectives</Text>
    </Col>
    <Col style={centerStyle}>
      <AddSvg />
    </Col>
    <Col style={centerStyle}>
      <DuplicateSvg />
    </Col>
  </Row>
);
