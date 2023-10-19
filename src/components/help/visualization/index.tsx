import React from 'react';
import { Col, Image, Row, Typography } from 'antd';
import VisualizationAddNode from 'components/help/images/visualization-add-node.svg';
import VisualizationAddNodes from 'components/help/images/visualization-add-nodes.svg';
import VisualizationEdit from 'components/help/images/visualization-edit.svg';
import Filters from 'components/help/images/filters.svg';
import Queries from 'components/help/images/queries.svg';
import Styling from 'components/help/images/styling.svg';
import Style from 'components/help/images/style.svg';
import Focus from 'components/help/images/focus.svg';
import Expand from 'components/help/images/expand.svg';
interface MenuItem {
  content: JSX.Element;
  image?: JSX.Element;
}
const { Title, Text } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub5-1': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '20px',
            fontSize: '18px',
          }}
        >
          Add, Edit and Delete Node
        </Title>
        <Text strong style={{ marginLeft: '20px', fontSize: '16px' }}>
          1. Add a New Node
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>Click on the canvas and the system will open “Add New Node” drawer</li>
          <li>
            Select <b>the Type</b> and the system will bring the types properties
          </li>
          <li>Type the properties</li>
          <li>Select Node(s) for connection</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={VisualizationAddNode} />
          </Col>
          <Col span={12}>
            <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={VisualizationAddNodes} />
          </Col>
        </Row>
        <Text strong style={{ marginLeft: '20px', fontSize: '16px' }}>
          2. Node View, Edit or Delete
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click the <b>Node name</b> and the system will open “Node view” drawer
          </li>
          <li>
            Click the <b>Edit</b> icon and edit the node
          </li>
          <li>Type the Properties</li>
          <li>Select Node(s) for connection</li>
          <li>
            Click the <b>Comment</b> icon and will opens Comment drawer
          </li>
          <li>
            Click <b>Save</b> button
          </li>
          <li>
            Clicl <b>Delete</b> Icon and the node will be deleted
          </li>
        </ul>
        <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={VisualizationEdit} />
      </>
    ),
  },
  'sub5-2': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '20px',
            fontSize: '18px',
          }}
        >
          Filters
        </Title>
        <Text strong style={{ marginLeft: '20px', fontSize: '16px' }}>
          1. Add a New Property
        </Text>
        <ul style={{ color: '#808080' }}>
          <li>
            Click the <b>Checkbox</b> of the type and the system will show the nodes of the selecting type(s)
          </li>
          <li>
            Click the <b>Reset</b> button and the Data will be previews
          </li>
        </ul>
        <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={Filters} />
      </>
    ),
  },
  'sub5-3': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '20px',
            fontSize: '18px',
          }}
        >
          Queries
        </Title>
        <ul style={{ color: '#808080' }}>
          <li>
            Click <b> And</b> button and start query (to achieve the correct result, follow the points as written):
            <ul>
              <li>Select - Type, connection, other Type or</li>
              <li>Select - Type, the same Types property, connection, other Type or</li>
              <li>Select - Type, connection, other Type, the same Types property</li>
            </ul>
          </li>
          <p>The system will display nodes whose “Type” or “Types property” is written first in the query</p>
          <li>
            Click <b>Or</b> button and start query (to achieve the correct result, follow the points as written):
            <ul>
              <li>Select - Type, connection, other Type or</li>
              <li> Select - Type, Connection, or any other option you prefer</li>
            </ul>
            <p>
              The system will display all nodes and connections whose “Type”, “Types property” or “Connection” is
              written in the query
            </p>
          </li>
          <li>
            Click the <b>Reset</b> button and the Data will be previews
          </li>
        </ul>
        <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={Queries} />
      </>
    ),
  },
  'sub5-4': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '20px',
            fontSize: '18px',
          }}
        >
          Styling
        </Title>
        <ul style={{ color: '#808080' }}>
          <li>
            Styling can be applied to all data and can also include the use of time for filtering, querying, or
            displaying search results
          </li>
          <li>
            Click <b>+Add</b> button and start styling
          </li>
          <li>Style Type, Type property or connection</li>
          <li>
            Click <b>Run</b> button and the system will display the result
          </li>
          <li>
            Click <b>Delete</b> icon (x) and delete the style or click <b>Clean all</b> button and delete all styles
          </li>
          <li>
            Click <b>Reset</b> button and the Data will be previews
          </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={Styling} />
          </Col>
          <Col span={12}>
            <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={Style} />
          </Col>
        </Row>
      </>
    ),
  },
  'sub5-5': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '20px',
            fontSize: '18px',
          }}
        >
          Focus, Expand, Shortest path
        </Title>
        <ul style={{ color: '#808080' }}>
          <li>Right-click on the node and choose Function</li>
          <li>
            Click <b>Focus on node</b> button and the system will hide all nodes and display that node with first
            category connections
          </li>
          <li>
            Click <b> Expand</b> button and the system will display that nodes connections
          </li>
          <li>
            Click <b>Shortest path</b>button and the system will open “Shortest path” drawer:
            <ul>
              <li>Source - That selected node</li>
              <li>Target - choose the node</li>
            </ul>
          </li>
          <li>
            Click <b>Show path</b> button and the system will display the path
          </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={Focus} />
          </Col>
          <Col span={12}>
            <Image rootClassName='help-image' wrapperStyle={{ display: 'block' }}  src={Expand} />
          </Col>
        </Row>
      </>
    ),
  },
};

interface VisualizationSectionProps {
  activeMenuItem: string;
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <div style={{ fontSize: '16px' }}>
        {menuItem.content}
        {menuItem.image}
      </div>
    );
  }

  return null;
};
