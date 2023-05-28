import { Collapse } from 'antd';
import { CaretRightOutlined } from '@ant-design/icons';
import { Footer } from './footer';
import { ReactComponent as MoreSvg } from './icons/more.svg';

const { Panel } = Collapse;

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

export const Content = () => {
  const panelStyle = {
    marginBottom: 8,
    background: '#CBCDD9',
    borderRadius: 1,
    border: 'none',
  };

  const genExtra = () => (
    <MoreSvg
      style={{
        display: 'flex',
      }}
      onClick={(event) => {
        event.stopPropagation();
      }}
    />
  );
  return (
    <Collapse
      accordion
      bordered={false}
      defaultActiveKey={['1']}
      onChange={() => { return; }}
      expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
      style={{
        position: 'absolute',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#f4f5fb',
        color: '#232F6A',
      }}
    >
      <Panel showArrow={false} header="This is panel header 1" key="1" style={panelStyle} extra={genExtra()}>
        <span>{text}</span>
        <Footer />
      </Panel>
      <Panel showArrow={false} header="This is panel header 1" key="2" style={panelStyle} extra={genExtra()}>
        <span>{text}</span>
        <Footer />
      </Panel>
      <Panel showArrow={false} header="This is panel header 1" key="3" style={panelStyle} extra={genExtra()}>
        <span>{text}</span>
        <Footer />
      </Panel>
    </Collapse>
  );
};
