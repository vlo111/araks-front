import React from 'react';
import { Col, Image, Row } from 'antd';
import EditDeleteTypes from 'components/help/images/edit-type.svg';
import NewProperty from 'components/help/images/new-property.svg';
import EditProperty from 'components/help/images/edit-property.svg';
import CreateANewType from 'components/help/images/new-type.svg';
import NewConnection from 'components/help/images/new-connection.svg';
import ConnectionType from 'components/help/images/connection-type.svg';
import ConnectionTypes from 'components/help/images/connection-types.svg';
import DeleteConnectionProperty from 'components/help/images/delete-con-prop.svg';
import EditConnectionProperty from 'components/help/images/edit-con-prop.svg';
import EditConnection from 'components/help/images/edit-connection.svg';
import NodeInConnection from 'components/help/images/node-incon.svg';
import EditNodes from 'components/help/images/edit-nodes.svg';
import AllData from 'components/help/images/all-data.svg';
import AddNode from 'components/help/images/add-node.svg';
import ViewNode from 'components/help/images/view-node.svg';

interface DataSheetSectionProps {
  activeMenuItem: string;
}

export const DataSheetSection: React.FC<DataSheetSectionProps> = ({ activeMenuItem }) => {
  if (activeMenuItem === 'sub3-1') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Create, Edit and Delete Type</p>
        <p>1. Create a New Type </p>
        <ul style={{ color: '#808080' }}>
          <li>Click + and the system will open “Create New Type” pop-up</li>
          <li>
            Type the <b>Node Type Name</b> (required)
          </li>
          <li>Parent select (empty-First Type creating). Parent can be all Types except his child</li>
          <li>Inherit properties (disable-when type is child)</li>
          <li>Select color and Icon (required and unique)</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Image src={CreateANewType} />
        <p>2. Edit or Delete the Type</p>
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
        </ul>
        <Image src={EditDeleteTypes} />
      </div>
    );
  }
  if (activeMenuItem === 'sub3-2') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Add, Edit and Delete Property</p>
        <p>1. Add a New Property</p>
        <ul style={{ color: '#808080' }}>
          <li>
            Click <b>+Add property</b> and the system will open “Add Property for type” pop-up
          </li>
          <li>
            Type the <b>Property Name</b> (required and First character must be letter)
          </li>
          <li>
            Select Data type - Text, Date, Date time, Integer, Decimal, Boolean, Location, URL, Image URL, Document,
            Rich Text, or Connection
          </li>
          <li>Select Required, Multiple or Set field as unique</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Image src={NewProperty} />
        <p>2. Edit or Delete the Property </p>
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
        </ul>
        <Image src={EditProperty} />
      </div>
    );
  }
  if (activeMenuItem === 'sub3-3') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Create, Edit and Delete Connection</p>
        <p>1. Create a New Connection (by selecting Data type - connection)</p>
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
        </ul>
        <Image src={NewConnection} />
        <p>
          1. Create a New Connection (create connection by clicking <b>+Connection Type</b> from taxonomy)
        </p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>Click + and the system will open “Create Connection type” pop-up</li>
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
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image src={ConnectionType} />
          </Col>
          <Col span={12}>
            <Image src={ConnectionTypes} />
          </Col>
        </Row>
        <p>2. Edit or Delete the Connection</p>
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
        </ul>
        <Image src={EditConnection} />
      </div>
    );
  }
  if (activeMenuItem === 'sub3-4') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Add, Edit and Delete Connection Property</p>
        <p>1. Add a New Connection Property </p>
        <ul style={{ color: '#808080' }}>
          <li>Click + and the system will open “Add property for connection type ” pop-up</li>
          <li>Type the Property Name (required and First character must be letter)</li>
          <li>Select Data type-Text, Date, Date time, Integer, Decimal</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Image src={DeleteConnectionProperty} />
        <p>2. Edit or Delete the Connection Property </p>
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
        </ul>
        <Image src={EditConnectionProperty} />
      </div>
    );
  }
  if (activeMenuItem === 'sub3-5') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Add, Edit and Delete Node in Connection</p>
        <p>1. Add a New Node in Connection </p>
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
        </ul>
        <Image src={NodeInConnection} />
        <p>2. Edit or Delete the nodes of connection</p>
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
        </ul>
        <Image src={EditNodes} />
      </div>
    );
  }
  if (activeMenuItem === 'sub3-6') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>All data</p>
        <ul style={{ color: '#808080' }}>
          <li>Click to the check box of the taxonomy and the system will show the nodes of the selecting type</li>
          <li>Check the boxes and click to the “delete” Icon to Delete the nodes</li>
          <li>
            Click Sort By:
            <ul>
              <li>A to Z - the nodes starting with the letter A appearing first</li>
              <li>Z to A - the nodes starting with the letter A appearing first</li>
              <li>Newest First - the last update nodes appearing first</li>
              <li>Oldest First - the old update nodes appearing first</li>
            </ul>
          </li>
          <li>
            Search:
            <ul>
              <li>Node-search node</li>
              <li>Document-search document</li>
            </ul>
          </li>
        </ul>
        <Image src={AllData} />
        <p>2. Edit or Delete the nodes of connection</p>
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
        </ul>
        <Image src={EditNodes} />
      </div>
    );
  }
  if (activeMenuItem === 'sub3-7') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Add, Edit and Delete Node</p>
        <p>1. Add a New Node </p>
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
        </ul>
        <Image src={AddNode} />
        <p>2. Node View, Edit or Delete </p>
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
        </ul>
        <Image src={ViewNode} />
      </div>
    );
  }
  return null;
};
