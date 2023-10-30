import React from 'react';
import { Col, Image, Row, Typography } from 'antd';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;
enum Paths {
  VisualizationAddNode = 'helps/visualization-add-node.svg',
  VisualizationAddNodes = 'helps/visualization-add-nodes.svg',
  VisualizationEdit = 'helps/visualization-edit.svg ',
  Filters = 'helps/filters.svg',
  Queries = 'helps/queries.svg',
  Styling = 'helps/styling.svg',
  Style = 'helps/style.svg',
  Focus = 'helps/focus.svg',
  Expand = 'helps/expand.svg',
}
interface MenuItem {
  title: string;
  content: JSX.Element[];
  image?: JSX.Element;
}
const { Title, Text } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub5-1': {
    title: 'Add, Edit and Delete Node',
    content: [
      <Text strong style={{ fontSize: '16px' }}>
        1. Add a New Node
      </Text>,
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
      </ul>,
      <Row gutter={8}>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.VisualizationAddNode}`}
          />
        </Col>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.VisualizationAddNodes}`}
          />
        </Col>
      </Row>,
      <Text strong style={{ fontSize: '16px' }}>
        2. Node View, Edit or Delete
      </Text>,
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
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.VisualizationEdit}`}
      />,
    ],
  },
  'sub5-2': {
    title: 'Filters',
    content: [
      <Text strong style={{ fontSize: '16px' }}>
        1. Add a New Property
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>
          Click the <b>Checkbox</b> of the type and the system will show the nodes of the selecting type(s)
        </li>
        <li>
          Click the <b>Reset</b> button and the Data will be previews
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.Filters}`}
      />,
    ],
  },
  'sub5-3': {
    title: 'Queries',
    content: [
      <ul style={{ color: '#808080' }}>
        <li>
          Click to the <b>+Add</b> button and start query
        </li>
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
            The system will display all nodes and connections whose “Type”, “Types property” or “Connection” is written
            in the query
          </p>
        </li>
        <li>
          Click <b>Run</b> button and the system will display the result.
        </li>
        <li>
          Click the <b>Reset</b> button and the Data will be previews
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.Queries}`}
      />,
    ],
  },
  'sub5-4': {
    title: 'Styling',
    content: [
      <ul style={{ color: '#808080' }}>
        <li>
          Styling can be applied to all data and can also include the use of time for filtering, querying, or displaying
          search results
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
      </ul>,
      <Row gutter={8}>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.Styling}`}
          />
        </Col>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.Style}`}
          />
        </Col>
      </Row>,
    ],
  },
  'sub5-5': {
    title: 'Focus, Expand, Shortest path',
    content: [
      <ul style={{ color: '#808080' }}>
        <li>Right-click on the node and choose Function</li>
        <li>
          Click <b>Focus on node</b> button and the system will hide all nodes and display that node with first category
          connections
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
      </ul>,
      <Row gutter={8}>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.Focus}`}
          />
        </Col>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.Expand}`}
          />
        </Col>
      </Row>,
    ],
  },
};

interface VisualizationSectionProps {
  activeMenuItem: string;
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <div style={{ fontSize: '16px', padding: '0 20px' }}>
        <Title
          style={{
            marginTop: 0,
            paddingBottom: '20px',
            fontSize: '18px',
          }}
        >
          {menuItem.title}
        </Title>
        {menuItem.content}
      </div>
    );
  }

  return null;
};
