import { useGetAllMembers } from 'api/perspective/shared-users/use-get-all-members';
import { ReactComponent as Delete } from 'components/icons/delete_outline-simple.svg';
import { useDeleteMember } from 'api/perspective/shared-users/use-delete-user';
import { Table, Button, Popconfirm, message } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import './user-list.css';

export const UsersTable: React.FC = () => {
  const { data } = useGetAllMembers({ page: 1, size: 10, search: '' });

  const { mutate: deleteMember } = useDeleteMember(); // Assuming you have a delete API hook

  const handleDelete = async (id: React.Key, perspective_user_id: string) => {
    try {
      // eslint-disable-next-line no-console
      console.log({ id: id as string, perspective_user_id });
      await deleteMember({ id: id as string, perspective_user_id });
    } catch (error) {
      message.error('Error deleting member');
    }
  };

  const dataSource =
    data?.rows?.map((d) => ({
      key: d.id,
      member_name: `${d.perspective_users.first_name} ${d.perspective_users.last_name}`,
      last_update: dayjs(d.updated_at).format('YYYY-MM-DD HH:mm'),
      perspective: d.perspectives[0].title,
      role: d.role,
      action: (
        <Popconfirm
          overlayClassName="pop-confirm-member"
          placement="topLeft"
          title="Are you sure you want to delete this member?"
          onConfirm={() => handleDelete(d.perspective_id, d.perspective_user_id)}
          okText="Yes"
          cancelText="No"
        >
          <Button type="text" icon={<Delete />} />
        </Popconfirm>
      ),
    })) || [];

  const columns = [
    {
      title: 'Member name',
      dataIndex: 'member_name',
      maxWidth: 300,
    },
    {
      title: 'Last Update',
      dataIndex: 'last_update',
      maxWidth: 200,
    },
    {
      title: 'Perspective',
      dataIndex: 'perspective',
      maxWidth: 400,
    },
    {
      title: 'Role',
      dataIndex: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={{ pageSize: 50 }} scroll={{ y: 400 }} />;
};
