import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popover, Select, Space } from 'antd';
import { TabTablesQueries } from 'pages/data-sheet/components/all-data-queries/tab-tables-queries';
import { useState } from 'react';

export const QueriesForm = () => {
  const [openTable, setOpenTable] = useState(false);
  const form = Form.useFormInstance();

  const handleOpenChange = (newOpen: boolean) => {
    setOpenTable(newOpen);
  };

  return (
    <Form.List name="sights">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => (
            <Space key={field.key} align="baseline">
              <Form.Item
                noStyle
                shouldUpdate={(prevValues, curValues) =>
                  prevValues.area !== curValues.area || prevValues.sights !== curValues.sights
                }
              >
                {() => (
                  <Form.Item
                    {...field}
                    label="Sight"
                    name={[field.name, 'sight']}
                    rules={[{ required: true, message: 'Missing sight' }]}
                  >
                    <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }} options={[]} />
                  </Form.Item>
                )}
              </Form.Item>
              <Form.Item
                {...field}
                label="Price"
                name={[field.name, 'price']}
                rules={[{ required: true, message: 'Missing price' }]}
              >
                <Input />
              </Form.Item>

              <MinusCircleOutlined onClick={() => remove(field.name)} />
            </Space>
          ))}

          <Form.Item>
            <Popover
              content={<TabTablesQueries />}
              trigger="click"
              placement="bottom"
              arrow={false}
              open={openTable}
              zIndex={2}
              getPopupContainer={() => document.querySelector('.queries-filter-drawer .ant-drawer-body') as HTMLElement}
              onOpenChange={handleOpenChange}
              overlayStyle={{ width: '86%', overflow: 'auto', height: '100%' }}
              overlayInnerStyle={{ height: '100%', width: '100%', overflow: 'auto' }}
            >
              <Button type="dashed" onClick={() => setOpenTable(true)} block icon={<PlusOutlined />}>
                Add Property
              </Button>
            </Popover>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};
