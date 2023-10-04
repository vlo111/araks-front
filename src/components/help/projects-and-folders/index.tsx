// import React from 'react';
// import { Col, Image, Row } from 'antd';
// import CreateAProjectImg from 'components/help/images/create-a-project.svg';
// import EditProject from 'components/help/images/edit-project.svg';
// import EditProjects from 'components/help/images/edit-projects.svg';
// import DeleteProject from 'components/help/images/delete-project.svg';
// import CreateFolder from 'components/help/images/create-folder.svg';
// import EditFolder from 'components/help/images/edit-folder.svg';
// import DeleteFolder from 'components/help/images/delete-folder.svg';

// interface ProjectsFoldersProps {
//   activeMenuItem: string;
// }

// export const ProjectsFolders: React.FC<ProjectsFoldersProps> = ({ activeMenuItem }) => {
//   if (activeMenuItem === 'sub1-1') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Create, Edit and Delete the Project</p>
//         <p>1. Create a Project</p>
//         <p>
//           In the <b>Home</b> page of your account
//         </p>
//         <ul style={{ color: '#808080' }}>
//           <li>
//             Click <b>Create New Project</b> and navigate to the “Overview” page
//           </li>
//           <li>
//             Type the <b>Name</b> of the Project
//           </li>
//           <li>Select color and Icon</li>
//           <li>
//             Type a short <b>Description</b>
//           </li>
//           <li>Choose Privacy: Private(Can see only owner) or Public (Can see all users)</li>
//         </ul>
//         <Image src={CreateAProjectImg} />
//         <p>2. Edit the Project</p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> button the current Project
//           </li>
//           <li>
//             Click <b>Edit</b> button and navigate to the “Overview” page
//           </li>
//           <li>Can edit Name, Color, Icon, Description and Privacy</li>
//           <li>
//             Click <b>Save</b> button to keep changes
//           </li>
//         </ul>
//         <Row gutter={[8, 8]}>
//           <Col span={12}>
//             <Image src={EditProject} />
//           </Col>
//           <Col span={12}>
//             <Image src={EditProjects} />
//           </Col>
//         </Row>
//         <p>3. Delete the Project</p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> button the current Project
//           </li>
//           <li>
//             Click <b>Delete</b> button
//           </li>
//           <li>
//             Click <b>Ok</b> to delete the Project
//           </li>
//         </ul>
//         <Image src={DeleteProject} />
//       </div>
//     );
//   }
//   if (activeMenuItem === 'sub1-2') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Create, Edit and Delete the Folder</p>
//         <p>1. Create a Folder</p>
//         <p>
//           In the <b>Home</b> page of your account
//         </p>
//         <ul style={{ color: '#808080' }}>
//           <li>
//             Click <b>Add Folder</b>
//           </li>
//           <li>
//             Type the <b>Name</b> of the Folder
//           </li>
//           <li>
//             Click <b>Save</b> button
//           </li>
//         </ul>
//         <Image src={CreateFolder} />
//         <p>2. Edit the Folder</p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> button the current Folder
//           </li>
//           <li>
//             Click <b>Edit</b> button
//           </li>
//           <li>Edit the Folder name</li>
//           <li>
//             Click <b>Save</b> to keep changes
//           </li>
//         </ul>
//         <Image src={EditFolder} />
//         <p>3. Delete the Folder</p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> button the current Folder
//           </li>
//           <li>
//             Click <b>Delete </b> button
//           </li>
//           <li>
//             Click <b>Ok</b> to delete the Folder
//           </li>
//         </ul>
//         <Image src={DeleteFolder} />
//       </div>
//     );
//   }

//   return null;
// };
import React from 'react';
import { Col, Image, Row, Typography } from 'antd';
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
const { Title } = Typography;

const menuItems: Record<string, MenuItem> = {
  'sub1-1': {
    content: (
      <>
        <Title level={5}>Create, Edit and Delete the Project</Title>
        <p>1. Create a Project</p>
        <p>
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
          <li>Choose Privacy: Private(Can see only owner) or Public (Can see all users)</li>
        </ul>
        <Image src={CreateAProjectImg} />
        <p>2. Edit the Project</p>
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
        <p>3. Delete the Project</p>
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
        <Title level={5}>Create, Edit and Delete the Folder</Title>
        <p>1. Create a Folder</p>
        <p>
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
        <p>2. Edit the Folder</p>
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
        <p>3. Delete the Folder</p>
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
      <div style={{ fontSize: '16px' }}>
        {menuItem.content}
        {menuItem.image}
      </div>
    );
  }

  return null;
};
