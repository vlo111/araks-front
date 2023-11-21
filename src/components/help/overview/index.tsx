import React from 'react';
import { Image, Typography } from 'antd';
const helpUrl = `${process.env.REACT_APP_AWS_URL}`;

const { Title } = Typography;

enum Paths {
  ProjectName = 'helps/project-name.svg',
  AllMembers = 'helps/all-members.svg',
  Comments = 'helps/comments.svg',
}
interface MenuItem {
  title: string;
  content: JSX.Element;
  image?: JSX.Element;
}
const menuItems: Record<string, MenuItem> = {
  'sub4-1': {
    title: 'Project name and Privacy',
    content: (
      <>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
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
        </ul>
        <Image
          rootClassName="help-image"
          wrapperStyle={{ display: 'block', marginBottom: '20px' }}
          src={`${helpUrl}${Paths.ProjectName}`}
        />
      </>
    ),
  },
  'sub4-2': {
    title: 'See all members',
    content: (
      <>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
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
        </ul>
        <Image
          rootClassName="help-image"
          wrapperStyle={{ display: 'block', marginBottom: '20px' }}
          src={`${helpUrl}${Paths.AllMembers}`}
        />
      </>
    ),
  },
  'sub4-3': {
    title: 'Comments and Likes',
    content: (
      <>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>Write comment and click submit</li>
          <li>
            Write <b>@Member email</b> and click submit (the mentioned User will get notification)
          </li>
          <li>
            Click <b>Like</b> or <b>Unlike</b> the project
          </li>
        </ul>
        <Image
          rootClassName="help-image"
          wrapperStyle={{ display: 'block', marginBottom: '20px' }}
          src={`${helpUrl}${Paths.Comments}`}
        />
      </>
    ),
  },
};
interface OverviewSectionProps {
  activeMenuItem: string;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ activeMenuItem }) => {
  const menuItem = menuItems[activeMenuItem];

  if (menuItem) {
    return (
      <div style={{ fontSize: '16px', margin: '0 20px' }}>
        <Title
          style={{
            marginTop: 0,
            margin: '0 0 30px 0',
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
