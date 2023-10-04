import React from 'react';
import { Col, Image, Row } from 'antd';
import VisualizationAddNode from 'components/help/images/visualization-add-node.svg';
import VisualizationAddNodes from 'components/help/images/visualization-add-nodes.svg';
import VisualizationEdit from 'components/help/images/visualization-edit.svg';
import Filters from 'components/help/images/filters.svg';
import Queries from 'components/help/images/queries.svg';
import Styling from 'components/help/images/styling.svg';
import Style from 'components/help/images/style.svg';
import Focus from 'components/help/images/focus.svg';
import Expand from 'components/help/images/expand.svg';

interface VisualizationSectionProps {
  activeMenuItem: string;
}

export const VisualizationSection: React.FC<VisualizationSectionProps> = ({ activeMenuItem }) => {
  if (activeMenuItem === 'sub5-1') {
    return (
      <div>
        <p>1. Add a New Node </p>
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
            <Image src={VisualizationAddNode} />
          </Col>
          <Col span={12}>
            <Image src={VisualizationAddNodes} />
          </Col>
        </Row>
        <p>2. Node View, Edit or Delete</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click to the <b>Node name</b> and the system will open “Node view” drawer
          </li>
          <li>
            Click to the <b>Edit</b> icon and edit the node
          </li>
          <li>Type the Properties</li>
          <li>Select Node(s) for connection</li>
          <li>
            Click to the <b>Comment</b> icon and will opens Comment drawer
          </li>
          <li>
            Click <b>Save</b> button
          </li>
          <li>
            Clicl <b>Delete</b> Icon and the node will be deleted
          </li>
        </ul>
        <Image src={VisualizationEdit} />
      </div>
    );
  }

  if (activeMenuItem === 'sub5-2') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Filters</p>
        <ul style={{ color: '#808080' }}>
          <li>
            Click to the <b>Checkbox</b> of the type and the system will show the nodes of the selecting type(s)
          </li>
          <li>
            Click to the <b>Reset</b> button and the Data will be previews.
          </li>
        </ul>
        <Image src={Filters} />
      </div>
    );
  }
  if (activeMenuItem === 'sub5-3') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Queries</p>
        <ul style={{ color: '#808080' }}>
          <li>
            Click to the And button and start query (to achieve the correct result, follow the points as written):
            <ul>
              <li>Select - Type, connection, other Type or</li>
              <li>Select - Type, the same Types property, connection, other Type or</li>
              <li> Select - Type, connection, other Type, the same Types property</li>
            </ul>
          </li>
          <p>The system will display nodes whose “Type” or “Types property” is written first in the query</p>
          <li>
            Click to the Or button and start query (to achieve the correct result, follow the points as written):
            <ul>
              <li>Select - Type, connection, other Type or</li>
              Select - Type, Connection, or any other option you prefer
            </ul>
            <p>
              The system will display all nodes and connections whose “Type”, “Types property” or “Connection” is
              written in the query.
            </p>
          </li>
          <li>Click to the Reset button and the Data will be previews.</li>
        </ul>
        <Image src={Queries} />
      </div>
    );
  }
  if (activeMenuItem === 'sub5-4') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Styling</p>
        <ul style={{ color: '#808080' }}>
          <li>
            Styling can be applied to all data and can also include the use of time for filtering, querying, or
            displaying search results
          </li>
          <li>
            Click to the <b>+Add</b> button and start styling
          </li>
          <li>Style Type, Type property or connection</li>
          <li>
            Click <b>Run</b> button and the system will display the result
          </li>
          <li>
            Click <b>Delete</b> icon (x) and delete the style or click <b>Clean all</b> button and delete all styles
          </li>
          <li>Click to the Reset button and the Data will be previews</li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image src={Styling} />
          </Col>
          <Col span={12}>
            <Image src={Style} />
          </Col>
        </Row>
      </div>
    );
  }
  if (activeMenuItem === 'sub5-5') {
    return (
      <div style={{ fontSize: '16px' }}>
        <p style={{ fontWeight: '600' }}>Focus, Expand, Shortest path</p>
        <ul style={{ color: '#808080' }}>
          <li>Right-click on the node and choose Function</li>
          <li>
            Click to the Focus on node button and the system will hide all nodes and display that node with first
            category connections
          </li>
          <li>Click to the Expand button and the system will display that nodes connections</li>
          <li>
            Click to the Shortest path button and the system will open “Shortest path” drawer:
            <ul>
              <li>Source - That selected node</li>
              <li>Target - choose the node</li>
            </ul>
          </li>
          <li>Click to the Show path button and the system will display the path</li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image src={Focus} />
          </Col>
          <Col span={12}>
            <Image src={Expand} />
          </Col>
        </Row>
      </div>
    );
  }
  return null;
};
