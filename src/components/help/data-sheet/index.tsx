import React from 'react';
import { Col, Image, Row, Typography } from 'antd';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;

enum Paths {
  NewType = 'helps/new-type.svg',
  EditDeleteType = 'helps/edit-type.svg',
  NewProperty = 'helps/new-property.svg',
  EditProperty = 'helps/edit-property.svg',
  NewConnection = 'helps/new-connection.svg',
  ConnectionType = 'helps/connection-type.svg',
  ConnectionTypes = 'helps/connection-types.svg',
  EditConnection = 'helps/edit-connection.svg',
  DeleteConnectionProperty = 'helps/delete-con-prop.svg',
  NodeInConnection = 'helps/node-incon.svg',
  EditConnectionProperty = 'helps/edit-con-prop.svg',
  EditNodes = 'helps/edit-nodes.svg',
  AllData = 'helps/all-data.svg',
  AddNode = 'helps/add-node.svg',
  ViewNode = 'helps/view-node.svg',
}

interface MenuItem {
  title: string;
  content: JSX.Element[];
  image?: JSX.Element;
}
const { Title, Text } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub3-1': {
    title: 'Create, Edit and Delete Type',
    content: [
      <Text strong style={{ fontSize: '16px', marginBottom: '30px' }}>
        1. Create a New Type
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>
          Click <b>+</b> and the system will open “Create New Type” pop-up
        </li>
        <li>
          Type the <b>Node Type Name</b> (required)
        </li>
        <li>Parent select (empty-First Type creating). Parent can be all Types except his child</li>
        <li>Inherit properties (disable-when type is child)</li>
        <li>Select color and Icon (required and unique)</li>
        <li>
          Click <b>Save</b> button
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.NewType}`}
      />,
      <Text strong style={{ fontSize: '16px' }}>
        2. Edit or Delete the Type
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click <b>Setting</b> the current Type
        </li>
        <li>Edit Type Name, Parent and Color</li>
        <li>
          Click <b>Save</b> button to keep changes
        </li>
        <li>
          Click <b>Delete</b> button (The system will remove if the Type is Empty)
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.EditDeleteType}`}
      />,
    ],
  },
  'sub3-2': {
    title: 'Add, Edit and Delete Property',
    content: [
      <Text strong style={{ fontSize: '16px' }}>
        1. Add a New Property
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>
          Click <b>+Add property</b> and the system will open “Add Property for type” pop-up
        </li>
        <li>
          Type the <b>Property Name</b> (required and First character must be letter)
        </li>
        <li>
          Select Data type - Text, Date, Date time, Integer, Decimal, Boolean, Location, URL, Image URL, Document, Rich
          Text, or Connection
        </li>
        <li>Select Required, Multiple or Set field as unique</li>
        <li>
          Click <b>Save</b> button
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.NewProperty}`}
      />,
      <Text strong style={{ fontSize: '16px' }}>
        2. Edit or Delete the Property
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click <b>Setting</b> the current Type
        </li>
        <li>
          Edit the <b>Property Name</b> (required and First character must be letter)
        </li>
        <li>Change Data type</li>
        <li>Change Required, Multiple or Set field as unique</li>
        <li>
          Click <b>Save</b> button to keep changes
        </li>
        <li>
          Click <b>Delete</b> button (The property will be deleted if there are no data)
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.EditProperty}`}
      />,
    ],
  },
  'sub3-3': {
    title: 'Create, Edit and Delete Connection',
    content: [
      <Text strong style={{ fontSize: '16px' }}>
        1. Create a New Connection (by selecting Data type - connection)
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>
          Click <b>+Add property</b> and the system will open “Add Property for type” pop-up
        </li>
        <li>
          Select Data type <b>Connection</b>
        </li>
        <li>
          Type the <b>Connection name</b> (required)
        </li>
        <li>Source - disable</li>
        <li>Target - dropdown (there will show the list of types)</li>
        <li>Inverse - (if the source and target the same type)</li>
        <li>
          Click <b>Save</b> button for connect types
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.NewConnection}`}
      />,
      <Text strong style={{ fontSize: '16px' }}>
        2. Create a New Connection (create connection by clicking <b>+Connection Type</b> from taxonomy)
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click <b>+</b> and the system will open “Create Connection type” pop-up
        </li>
        <li>
          Type the <b>Connection</b> name (required)
        </li>
        <li>Source - dropdown (there will show the list of types)</li>
        <li>Target - dropdown (there will show the list of types)</li>
        <li>Inverse - (if the source and target the same type)</li>
        <li>Click Save button for connect types</li>
        <li>
          Click <b>Save</b> button to keep changes
        </li>
      </ul>,
      <Row gutter={8}>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.ConnectionType}`}
          />
        </Col>
        <Col span={12}>
          <Image
            rootClassName="help-image"
            wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
            src={`${helpUrl}${Paths.ConnectionTypes}`}
          />
        </Col>
      </Row>,
      <Text strong style={{ fontSize: '16px' }}>
        3. Edit or Delete the Connection
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click <b>Target-Source</b> of the current connection
        </li>
        <li>The system will open “Edit Connection Type” pop-up </li>
        <li>
          Edit the <b>Connection name</b> (if there are no data)
        </li>
        <li>Source - dropdown (there will show the list of types, if there are no data)</li>
        <li>Target - dropdown (there will show the list of types, if there are no data)</li>
        <li>Inverse - (if the source and target the same type)</li>
        <li>
          Click <b>Save</b> button to keep changes
        </li>
        <li>
          Click <b>Delete</b> button (The Connection will be deleted if there are no data)
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.EditConnection}`}
      />,
    ],
  },
  'sub3-4': {
    title: ' Add, Edit and Delete Connection Property',
    content: [
      <Text strong style={{ fontSize: '16px', marginBottom: '30px' }}>
        1. Add a New Connection Property
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>Click + and the system will open “Add property for connection type ” pop-up</li>
        <li>Type the Property Name (required and First character must be letter)</li>
        <li>Select Data type-Text, Date, Date time, Integer, Decimal</li>
        <li>
          Click <b>Save</b> button
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.DeleteConnectionProperty}`}
      />,
      <Text strong style={{ fontSize: '16px' }}>
        2. Edit or Delete the Connection Property
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click on <b>the property</b> and the system will open “Edit connection property” pop-up
        </li>
        <li>
          Edit the <b>Property Name</b> (required and First character must be letter)
        </li>
        <li>Change Data type (every Data type has own types to change)</li>
        <li>
          Click <b>Save</b> button to keep changes
        </li>
        <li>
          Click <b>Delete</b> button (The property will be deleted if there are no data)
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.EditConnectionProperty}`}
      />,
    ],
  },
  'sub3-5': {
    title: 'Add, Edit and Delete Node in Connection',
    content: [
      <Text strong style={{ fontSize: '16px' }}>
        1. Add a New Node in Connection
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>
          Click <b>+Add Node</b> and the system will open “Add New Node” pop-up
        </li>
        <li>Source-Search and select node</li>
        <li>Target-Search and select node</li>
        <li>Type the Data to the connection property (required and First character must be letter)</li>
        <li>
          Click <b>Save</b> button
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.NodeInConnection}`}
      />,
      <Text strong style={{ fontSize: '16px' }}>
        2. Edit or Delete the nodes of connection
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click <b>the Node</b> and the system will open “Connection Node” pop-up
        </li>
        <li>
          Edit the nodes <b>Target/source</b>
        </li>
        <li>Change the Data of the connection property</li>
        <li>
          Click <b>Save</b> button to keep changes
        </li>
        <li>
          Click <b>Cancel</b> button
        </li>
        <li>
          Click <b>Delete</b> Icon (The node will be deleted)
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.EditNodes}`}
      />,
    ],
  },
  'sub3-6': {
    title: 'All data',
    content: [
      <ul style={{ color: '#808080' }}>
        <li>
          Click to the <b>check box</b> of the taxonomy and the system will show the nodes of the selecting type
        </li>
        <li>
          Check the boxes and click to the “delete” Icon to <b>Delete</b> the nodes
        </li>
        <li>
          Click Sort By:
          <ul>
            <li>
              <b>A to Z</b> - the nodes starting with the letter A appearing first
            </li>
            <li>
              <b>Z to A</b> - the nodes starting with the letter A appearing first
            </li>
            <li>
              <b>Newest First</b> - the last update nodes appearing first
            </li>
            <li>
              <b>Oldest First </b>- the old update nodes appearing first
            </li>
          </ul>
        </li>
        <li>
          <b>Search:</b>
          <ul>
            <li>Node-search node</li>
            <li>Document-search document</li>
          </ul>
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.AllData}`}
      />,
    ],
  },
  'sub3-7': {
    title: 'Add, Edit and Delete Node',
    content: [
      <Text strong style={{ fontSize: '16px' }}>
        1. Add a New Node
      </Text>,
      <ul style={{ color: '#808080' }}>
        <li>
          Click <b>+Add Node</b> and the system will open “Add New Node” pop-up
        </li>
        <li>
          Type the <b>Node Name</b> (required)
        </li>
        <li>Type the Properties</li>
        <li>Select Node(s) for connection</li>
        <li>
          Click <b>Save</b> button
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.AddNode}`}
      />,
      <Text strong style={{ fontSize: '16px' }}>
        2. Node View, Edit or Delete
      </Text>,
      <ul style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click to the <b>Node name</b> and the system will open “Node view” drawer
        </li>
        <li>
          Click to the <b>Edit</b> icon and edit the node
        </li>
        <li>
          Click to the <b>Visualization</b> icon and navigate to the visualization to see the node
        </li>
        <li>
          Click to the <b>Comment</b> icon and
        </li>
        <li>Type the Properties</li>
        <li>Select Node(s) for connection</li>
        <li>
          Click <b>Save</b> button
        </li>
      </ul>,
      <Image
        rootClassName="help-image"
        wrapperStyle={{ display: 'block', paddingBottom: '20px' }}
        src={`${helpUrl}${Paths.ViewNode}`}
      />,
    ],
  },
};

interface DataSheetSectionProps {
  activeMenuItem: string;
}

export const DataSheetSection: React.FC<DataSheetSectionProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <div style={{ fontSize: '16px', marginTop: 0, padding: '0 20px' }}>
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
