// import React from 'react';
// import { Image } from 'antd';
// import AddNewProperty from 'components/help/images/add-new-property.svg';
// import EditDeleteProperty from 'components/help/images/edit-delete-property.svg';
// import CreateConnection from 'components/help/images/create-connection.svg';
// import EditDeleteConnection from 'components/help/images/edit-delete-connection.svg';
// import AddConnectionProperty from 'components/help/images/add-connection-property.svg';
// import EditDeleteConnectionProperty from 'components/help/images/edit-delete-connection-propoerty.svg';
// import SearchInSchema from 'components/help/images/search-in-schema.svg';
// import CreateNewType from 'components/help/images/create-new-type.svg';
// import EditDeleteType from 'components/help/images/edit-delete-type.svg';

// interface SchemaSectionProps {
//   activeMenuItem: string;
// }

// export const SchemaSection: React.FC<SchemaSectionProps> = ({ activeMenuItem }) => {
//   if (activeMenuItem === 'sub2-1') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Create, Edit and Delete Type</p>
//         <p>1. Create a New Type</p>
//         <ul style={{ color: '#808080' }}>
//           <li>Click + and the cursor pointer will moves with mouse</li>
//           <li>Click on the canvas and the system will open “Add New Type” pop-up</li>
//           <li>
//             Type the <b>Node Type Name</b> (required)
//           </li>
//           <li>Parent select (empty - First Type creating). Parent can be all Types except his child</li>
//           <li>Inherit properties (disable - when type is child)</li>
//           <li>Select color and Icon (required and unique)</li>
//           <li>
//             Click <b>Save</b> button
//           </li>
//         </ul>
//         <Image src={CreateNewType} />
//         <p>2. Edit or Delete the Type </p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> the current Type
//           </li>
//           <li>Edit Type Name, Parents and Color</li>
//           <li>
//             Click <b>Save</b> button to keep changes
//           </li>
//           <li>
//             Click <b>Delete</b> button (The system will remove if the Type is Empty)
//           </li>
//         </ul>
//         <Image src={EditDeleteType} />
//       </div>
//     );
//   }
//   if (activeMenuItem === 'sub2-2') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Add, Edit and Delete Property</p>
//         <p>1. Add a New Property</p>
//         <ul style={{ color: '#808080' }}>
//           <li>
//             Click <b>+Add property</b> and the system will open “Add New Property” pop-up
//           </li>
//           <li>
//             Type the <b>Property Name</b> (required and First character must be letter)
//           </li>
//           <li>
//             Select Data type - Text, Date, Date time, Integer, Decimal, Boolean, Location, URL, Image URL, Document,
//             Rich Text, Connection
//           </li>
//           <li>Select Required, Multiple or Set field as unique</li>
//           <li>
//             Click <b>Save</b> button
//           </li>
//         </ul>
//         <Image src={AddNewProperty} />
//         <p>2. Edit or Delete the Property </p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> the current Type.
//           </li>
//           <li>
//             Edit the <b>Property Name</b> (required and First character must be letter)
//           </li>
//           <li>Change Data type</li>
//           <li>Change Required, Multiple or Set field as unique </li>
//           <li>
//             Click <b>Save</b> button to keep changes
//           </li>
//           <li>
//             Click <b>Delete</b> button (The property will be deleted if there are no data)
//           </li>
//         </ul>
//         <Image src={EditDeleteProperty} />
//       </div>
//     );
//   }
//   if (activeMenuItem === 'sub2-3') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Create, Edit and Delete Connection</p>
//         <p>1. Create a New Connection</p>
//         <ul style={{ color: '#808080' }}>
//           <li>Select the type and drag connection line to another type and connect it </li>
//           <li>The system will open “Add Connection” pop-up </li>
//           <li>
//             Type the <b>Connection name</b> (required)
//           </li>
//           <li>Source - dropdown (there will show the list of types)</li>
//           <li>Target - dropdown (there will show the list of types) </li>
//           <li>Inverse - (if the source and target the same type)</li>
//           <li>
//             Click <b>Save</b> button for connect types
//           </li>
//         </ul>
//         <Image src={CreateConnection} />
//         <p>2. Edit or Delete the Connection </p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click <b>Setting</b> the current connection.
//           </li>
//           <li>The system will open “Edit Connection” pop-up </li>
//           <li>
//             Edit the <b>Connection name</b>
//           </li>
//           <li>Source - dropdown (there will show the list of types)</li>
//           <li>Target - dropdown (there will show the list of types)</li>
//           <li>Inverse - (if the source and target the same type) </li>
//           <li>
//             Click <b>Save</b> button to keep changes
//           </li>
//           <li>
//             Click <b>Delete</b> button (The Connection will be deleted if there are no data)
//           </li>
//         </ul>
//         <Image src={EditDeleteConnection} />
//       </div>
//     );
//   }
//   if (activeMenuItem === 'sub2-4') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Add, Edit and Delete Connection Property</p>
//         <p>1. Add a New Connection Property</p>
//         <ul style={{ color: '#808080' }}>
//           <li>Click + and the system will open “Add property for connection type ” pop-up </li>
//           <li>
//             Type the <b>Property Name</b> (required and First character must be letter )
//           </li>
//           <li>Select Data type - Text, Date, Date time, Integer, Decimal</li>
//           <li>
//             Click <b>Save</b> button
//           </li>
//         </ul>
//         <Image src={AddConnectionProperty} />
//         <p>2. Edit or Delete the Connection Property </p>
//         <ul style={{ color: '#808080', fontSize: '16px' }}>
//           <li>
//             Click on <b>the property</b> and the system will open “Edit connection property” pop-up
//           </li>
//           <li>
//             Edit the <b>Property Name</b> (required and First character must be letter)
//           </li>
//           <li>Change Data type (every Data type has own types to change)</li>
//           <li>
//             Click <b>Save</b> button to keep changes
//           </li>
//           <li>
//             Click <b>Delete</b> button (The property will be deleted if there are no data)
//           </li>
//         </ul>
//         <Image src={EditDeleteConnectionProperty} />
//       </div>
//     );
//   }
//   if (activeMenuItem === 'sub2-5') {
//     return (
//       <div style={{ fontSize: '16px' }}>
//         <p style={{ fontWeight: '600' }}>Search In Schema</p>
//         <ul style={{ color: '#808080' }}>
//           <li>
//             Click <b>Search</b> and the system will open “search ” input
//           </li>
//           <li>
//             Type in to the search and the result can be:
//             <ul>
//               <li>Type</li>
//               <li>Node name </li>
//               <li>Property name </li>
//               <li>Property value </li>
//               <li>Connection </li>
//               <li>Connection property</li>
//             </ul>
//           </li>
//           <li>Click and the system will show the result</li>
//         </ul>
//         <Image src={SearchInSchema} />
//       </div>
//     );
//   }

//   return null;
// };
import React from 'react';
import { Image, Typography } from 'antd';

import AddNewProperty from 'components/help/images/add-new-property.svg';
import EditDeleteProperty from 'components/help/images/edit-delete-property.svg';
import CreateConnection from 'components/help/images/create-connection.svg';
import EditDeleteConnection from 'components/help/images/edit-delete-connection.svg';
import AddConnectionProperty from 'components/help/images/add-connection-property.svg';
import EditDeleteConnectionProperty from 'components/help/images/edit-delete-connection-propoerty.svg';
import SearchInSchema from 'components/help/images/search-in-schema.svg';
import CreateNewType from 'components/help/images/create-new-type.svg';
import EditDeleteType from 'components/help/images/edit-delete-type.svg';
const { Title } = Typography;

const sections: Record<
  string,
  {
    title: string;
    content: JSX.Element;
  }
> = {
  'sub2-1': {
    title: 'Create, Edit and Delete Type',
    content: (
      <>
        <p>1. Create a New Type</p>
        <ul style={{ color: '#808080' }}>
          <li>Click +, and the cursor pointer will move with the mouse</li>
          <li>Click on the canvas, and the system will open the Add New Type pop-up</li>
          <li>
            Type the <b>Node Type Name</b> (required)
          </li>
          <li>Parent select (empty - First Type creating). Parent can be all Types except his child</li>
          <li>Inherit properties (disable - when the type is a child)</li>
          <li>Select color and Icon (required and unique)</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        0
        <Image src={CreateNewType} />
        <p>2. Edit or Delete the Type</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> on the current Type
          </li>
          <li>Edit Type Name, Parents, and Color</li>
          <li>
            Click <b>Save</b> button to keep changes
          </li>
          <li>
            Click <b>Delete</b> button (The system will remove if the Type is Empty)
          </li>
        </ul>
        <Image src={EditDeleteType} />
      </>
    ),
  },
  'sub2-2': {
    title: 'Add, Edit and Delete Property',
    content: (
      <>
        <p>1. Add a New Property</p>
        <ul style={{ color: '#808080' }}>
          <li>
            Click <b>+Add property</b>, and the system will open the Add New Property pop-up
          </li>
          <li>
            Type the <b>Property Name</b> (required and the first character must be a letter)
          </li>
          <li>
            Select Data type - Text, Date, Date time, Integer, Decimal, Boolean, Location, URL, Image URL, Document,
            Rich Text, Connection
          </li>
          <li>Select Required, Multiple or Set field as unique</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Image src={AddNewProperty} />
        <p>2. Edit or Delete the Property</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> on the current Type.
          </li>
          <li>
            Edit the <b>Property Name</b> (required and the first character must be a letter)
          </li>
          <li>Change Data type</li>
          <li>Change Required, Multiple or Set field as unique</li>
          <li>
            Click <b>Save</b> button to keep changes
          </li>
          <li>
            Click <b>Delete</b> button (The property will be deleted if there is no data)
          </li>
        </ul>
        <Image src={EditDeleteProperty} />
      </>
    ),
  },
  'sub2-3': {
    title: 'Create, Edit and Delete Connection',
    content: (
      <>
        <p>1. Create a New Connection</p>
        <ul style={{ color: '#808080' }}>
          <li>Select the type and drag the connection line to another type and connect it</li>
          <li>The system will open the Add Connection pop-up</li>
          <li>
            Type the <b>Connection name</b> (required)
          </li>
          <li>Source - dropdown (there will show the list of types)</li>
          <li>Target - dropdown (there will show the list of types)</li>
          <li>Inverse - (if the source and target are the same type)</li>
          <li>
            Click <b>Save</b> button to connect types
          </li>
        </ul>
        <Image src={CreateConnection} />
        <p>2. Edit or Delete the Connection</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>Setting</b> on the current connection.
          </li>
          <li>The system will open the Edit Connection pop-up</li>
          <li>
            Edit the <b>Connection name</b>
          </li>
          <li>Source - dropdown (there will show the list of types)</li>
          <li>Target - dropdown (there will show the list of types)</li>
          <li>Inverse - (if the source and target are the same type)</li>
          <li>
            Click <b>Save</b> button to keep changes
          </li>
          <li>
            Click <b>Delete</b> button (The Connection will be deleted if there is no data)
          </li>
        </ul>
        <Image src={EditDeleteConnection} />
      </>
    ),
  },
  'sub2-4': {
    title: 'Add, Edit and Delete Connection Property',
    content: (
      <>
        <p>1. Add a New Connection Property</p>
        <ul style={{ color: '#808080' }}>
          <li>Click +, and the system will open the Add property for connection type pop-up</li>
          <li>
            Type the <b>Property Name</b> (required and the first character must be a letter)
          </li>
          <li>Select Data type - Text, Date, Date time, Integer, Decimal</li>
          <li>
            Click <b>Save</b> button
          </li>
        </ul>
        <Image src={AddConnectionProperty} />
        <p>2. Edit or Delete the Connection Property</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click on <b>the property</b>, and the system will open the Edit connection property pop-up
          </li>
          <li>
            Edit the <b>Property Name</b> (required and the first character must be a letter)
          </li>
          <li>Change Data type (every Data type has its own types to change)</li>
          <li>
            Click <b>Save</b> button to keep changes
          </li>
          <li>
            Click <b>Delete</b> button (The property will be deleted if there is no data)
          </li>
        </ul>
        <Image src={EditDeleteConnectionProperty} />
      </>
    ),
  },
  'sub2-5': {
    title: 'Search In Schema',
    content: (
      <>
        <ul style={{ color: '#808080' }}>
          <li>
            Click <b>Search</b>, and the system will open the search input
          </li>
          <li>Type in the search, and the result can be:</li>
          <ul>
            <li>Type</li>
            <li>Node name</li>
            <li>Property name</li>
            <li>Property value</li>
            <li>Connection</li>
            <li>Connection property</li>
          </ul>
          <li>Click, and the system will show the result</li>
        </ul>
        <Image src={SearchInSchema} />
      </>
    ),
  },
};

interface SchemaSectionProps {
  activeMenuItem: string;
}

export const SchemaSection: React.FC<SchemaSectionProps> = ({ activeMenuItem }) => {
  const section = sections[activeMenuItem];

  if (section) {
    return (
      <div style={{ fontSize: '16px' }}>
        <Title level={5}>{section.title}</Title> {section.content}
      </div>
    );
  }

  return null;
};
