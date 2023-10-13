import React from 'react';
import { Col, Image, Row, Space, Typography } from 'antd';
import CreateAProjectImg from 'components/help/images/create-a-project.svg';
import EditProject from 'components/help/images/edit-project.svg';
import EditProjects from 'components/help/images/edit-projects.svg';
import DeleteProject from 'components/help/images/delete-project.svg';
import CreateFolder from 'components/help/images/create-folder.svg';
import EditFolder from 'components/help/images/edit-folder.svg';
import DeleteFolder from 'components/help/images/delete-folder.svg';

interface MenuItem {
  content: JSX.Element;
  image?: JSX.Element;
}
const { Title, Text } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub1-1': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '10px',
            fontSize: '18px',
          }}
        >
          Create, Edit and Delete the Project
        </Title>
        <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
          1. Create a Project
        </Text>
        <p style={{ marginLeft: '10px' }}>
          In the <b>Home</b> page of your account
        </p>
        <ul style={{ color: '#808080' }}>
          <li>
            Click <b>Create New Project</b> and navigate to the “Overview” page
          </li>
          <li>
            Type the <b>Name</b> of the Project
          </li>
          <li>Select color and Icon</li>
          <li>
            Type a short <b>Description</b>
          </li>
          <li>Choose Privacy:</li>
          <ul>
            <li>Private (Can see only owner)</li>
            <li>Public (Can see all users)</li>
          </ul>
        </ul>
        <Image src={CreateAProjectImg} />
        <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
          2. Edit the Project
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> button on the current Project
          </li>
          <li>
            Click <b>Edit</b> button and navigate to the “Overview” page
          </li>
          <li>Can edit Name, Color, Icon, Description, and Privacy</li>
          <li>
            Click <b>Save</b> button to keep changes
          </li>
        </ul>
        <Row gutter={8}>
          <Col span={12}>
            <Image src={EditProject} />
          </Col>
          <Col span={12}>
            <Image src={EditProjects} />
          </Col>
        </Row>
        <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
          3. Delete the Project
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> button on the current Project
          </li>
          <li>
            Click <b>Delete</b> button
          </li>
          <li>
            Click <b>Ok</b> to delete the Project
          </li>
        </ul>
        <Image src={DeleteProject} />
      </>
    ),
  },
  'sub1-2': {
    content: (
      <>
        <Title
          style={{
            marginTop: 0,
            paddingLeft: '10px',
            fontSize: '18px',
          }}
        >
          Create, Edit and Delete the Folder
        </Title>
        <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
          1. Create a Folder
        </Text>
        <p style={{ marginLeft: '10px' }}>
          In the <b>Home</b> page of your account
        </p>
        <ul style={{ color: '#808080' }}>
          <li>
            Click <b>Add Folder</b>
          </li>
          <li>
            Type the <b>Name</b> of the Folder
          </li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Image src={CreateFolder} />
        <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
          2. Edit the Folder
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> button on the current Folder
          </li>
          <li>
            Click <b>Edit</b> button
          </li>
          <li>Edit the Folder name</li>
          <li>
            Click <b>Save</b> to keep changes
          </li>
        </ul>
        <Image src={EditFolder} />
        <Text strong style={{ marginLeft: '10px', fontSize: '16px' }}>
          3. Delete the Folder
        </Text>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> button on the current Folder
          </li>
          <li>
            Click <b>Delete </b> button
          </li>
          <li>
            Click <b>Ok</b> to delete the Folder
          </li>
        </ul>
        <Image src={DeleteFolder} />
      </>
    ),
  },
};

interface ProjectsFoldersProps {
  activeMenuItem: string;
}

export const ProjectsFolders: React.FC<ProjectsFoldersProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <Space>
        <div style={{ fontSize: '16px' }}>
          {menuItem.content}
          {menuItem.image}
        </div>
      </Space>
    );
  }

  return null;
};
