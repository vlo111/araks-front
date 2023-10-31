import { Typography } from 'antd';
import { ReactComponent as ErrorServer } from 'pages/error/servererror.svg';

const { Text } = Typography;

export function ServerError() {
  return (
    <div style={{}}>
      <Text style={{ color: '#2C447D', fontSize: '200px' }}>500</Text>
      <Text style={{ color: '#191E3A', fontSize: '80px' }}>Internet server error</Text>
      <ErrorServer />
    </div>
  );
}
