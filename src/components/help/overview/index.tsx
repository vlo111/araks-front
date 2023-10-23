import React from 'react';
import { Image, Typography } from 'antd';
import ProjectName from 'components/help/images/project-name.svg';
import AllMembers from 'components/help/images/all-members.svg';
import Comments from 'components/help/images/comments.svg';

interface MenuItem {
  title: string;
  content: JSX.Element[];
  image: JSX.Element;
}
const { Title } = Typography;
const menuItems: Record<string, MenuItem> = {
  'sub4-1': {
    title: 'Project name and Privacy',
    content: [
      <Title
        style={{
          marginTop: 0,
          paddingLeft: '20px',
          fontSize: '18px',
          marginBottom: '30px',
        }}
        key="1"
      >
        Project name and Privacy
      </Title>,
      <ul key="2" style={{ color: '#808080', fontSize: '16px' }}>
        <li>Click to the Edit icon and change:</li>
        <ul>
          <li>Project name</li>
          <li>Project Image icon </li>
          <li>Project Image color</li>
          <li>Project Privacy</li>
          <ul>
            <li>Private - the project can see only owner</li>
            <li>Public - the project can see all Users (view permission)</li>
          </ul>
        </ul>
        <li>Share section</li>
        <ul>
          <li>Click the Dropdown and choose the Perspective </li>
          <li>Write User email </li>
          <li>Choose the role </li>
          <li>Click the Send Invite button.</li>
        </ul>
      </ul>,
    ],
    image: <Image rootClassName="help-image" key="3" src={ProjectName} />,
  },
  'sub4-2': {
    title: 'See all members',
    content: [
      <Title
        style={{
          marginTop: 0,
          paddingLeft: '20px',
          fontSize: '18px',
          marginBottom: '30px',
        }}
        key="1"
      >
        See all members
      </Title>,
      <ul key="2" style={{ color: '#808080', fontSize: '16px' }}>
        <li>
          Click <b>See all members</b> and navigate to the all members page
        </li>
        <li>Click the Dropdown and choose the Perspective </li>
        <li>Write User email</li>
        <li>Choose the role</li>
        <li>
          Click the <b>Send Invite</b> button
        </li>
        <li>
          Change <b>Role</b> Edit or View
        </li>
        <li>
          Click <b>Delete</b> Icon (The shared perspective will be deleted)
        </li>
      </ul>,
    ],
    image: <Image rootClassName="help-image" key="3" src={AllMembers} />,
  },
  'sub4-3': {
    title: 'Comments and Likes',
    content: [
      <Title
        style={{
          marginTop: 0,
          paddingLeft: '20px',
          fontSize: '18px',
          marginBottom: '30px',
        }}
        key="1"
      >
        Comments and Likes
      </Title>,
      <ul key="2" style={{ color: '#808080', fontSize: '16px' }}>
        <li>Write comment and click submit</li>
        <li>
          Write <b>@Member email</b> and click submit (the mentioned User will get notification)
        </li>
        <li>
          Click <b>Like</b> or <b>Unlike</b> the project
        </li>
      </ul>,
    ],
    image: <Image rootClassName="help-image" key="3" src={Comments} />,
  },
};
interface OverviewSectionProps {
  activeMenuItem: string;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];
  if (menuItem) {
    return (
      <div>
        {menuItem.content.map((element, index) => (
          <React.Fragment key={index}>{element}</React.Fragment>
        ))}
        {menuItem.image}
      </div>
    );
  }
  return null;
};
