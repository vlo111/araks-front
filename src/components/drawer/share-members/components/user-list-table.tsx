/* eslint-disable react-hooks/exhaustive-deps */
import { useGetAllMembers } from 'api/perspective/shared-users/use-get-all-members';
import { ReactComponent as Delete } from 'components/icons/delete_outline-simple.svg';
import { useDeleteMember } from 'api/perspective/shared-users/use-delete-user';
import { Table, Button, Popconfirm, message, TablePaginationConfig } from 'antd';
import dayjs from 'dayjs';
import React, { useEffect, useState } from 'react';
import './user-list.css';

export const UsersTable: React.FC<{ search: string }> = ({ search }) => {
  const [pagination, setPagination] = useState({ page: 1, size: 10, search });

  const { data, isLoading } = useGetAllMembers(pagination);

  const { mutate: deleteMember } = useDeleteMember(pagination);

  const handleDelete = async (id: React.Key, perspective_user_id: string) => {
    try {
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

  const handleTableChange = (pagination: TablePaginationConfig): void => {
    setPagination({
      search: '',
      page: pagination.current ?? 0,
      size: pagination.pageSize ?? 0,
    });
  };

  useEffect(() => {
    setPagination({
      ...pagination,
      search,
    });
  }, [search]);

  return (
    <Table
      loading={isLoading}
      columns={columns}
      dataSource={dataSource}
      pagination={{
        pageSize: pagination.size,
        current: pagination.page,
        total: data?.count || 0,
      }}
      onChange={handleTableChange}
      scroll={{ y: 400 }}
    />
  );
};
