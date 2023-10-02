import React from 'react';
import { Image } from 'antd';
import ProjectName from 'components/help/images/projectname.svg';
import AllMembers from 'components/help/images/allmembers.svg';
import Comments from 'components/help/images/comments.svg';

interface OverviewSectionProps {
  activeMenuItem: string;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ activeMenuItem }) => {
  if (activeMenuItem === 'sub4-1') {
    return (
      <div>
        <p style={{ fontWeight: '600', fontSize: '16px' }}>Project name and Privacy</p>
        <p>
          <ul style={{ color: '#808080', fontSize: '16px' }}>
            <li>Click to the Edit icon and change:</li>
            <ul>
              <li>Click to the Edit icon and change:</li>
              <li>Project name</li>
              <li>Project Image icon </li>
              <li>Project Image color</li>
              <li>Project Privacy</li>
              <ul>
                <li>Private - the project can see only owner</li>
                <li>Public - the project can see all Users (view permission)</li>
              </ul>
            </ul>
            <li>Choose the Perspective And share</li>
          </ul>
        </p>
        <Image src={ProjectName} />
      </div>
    );
  }
  if (activeMenuItem === 'sub4-2') {
    return (
      <div>
        <p style={{ fontWeight: '600', fontSize: '16px' }}>See all members</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>
            Click <b>See all members</b> and navigate to the all members page
          </li>
          <li>
            Change <b>Role</b> Edit or View
          </li>
          <li>
            Click <b>Delete</b> Icon (The shared perspective will be deleted)
          </li>
        </ul>
        <Image src={AllMembers} />
      </div>
    );
  }
  if (activeMenuItem === 'sub4-3') {
    return (
      <div>
        <p style={{ fontWeight: '600', fontSize: '16px' }}>Comments and Likes</p>
        <ul style={{ color: '#808080', fontSize: '16px' }}>
          <li>Write comment and click submit</li>
          <li>
            Write <b>@ Member email</b> and click submit (the mentioned User will get notification)
          </li>
          <li>
            Click <b>Like</b> or <b>Unlike</b> the project
          </li>
        </ul>
        <Image src={Comments} />
      </div>
    );
  }
  return null;
};
