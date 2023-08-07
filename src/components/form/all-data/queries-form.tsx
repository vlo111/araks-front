import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Form, Input, Popover, Space } from 'antd';
import { QueriesSelect } from 'components/select/queries-select';
import { TabTablesQueries } from 'pages/data-sheet/components/all-data-queries/tab-tables-queries';
import { useState } from 'react';
import { PropertySection } from './property-section';

export const QueriesForm = () => {
  const [openTable, setOpenTable] = useState(false);
  const form = Form.useFormInstance();
  // eslint-disable-next-line no-console
  console.log('form', form.getFieldValue('queriesList'));

  const handleOpenChange = (newOpen: boolean) => {
    setOpenTable(newOpen);
  };

  return (
    <Form.List name="queries">
      {(fields, { add, remove }) => (
        <>
          {fields.map((field) => {
            // eslint-disable-next-line no-console
            console.log('fields', fields);
            return (
              <Space key={field.key} align="baseline">
                <PropertySection remove={() => remove(field.name)} fieldName={field.name} />
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
                      {/* <Select disabled={!form.getFieldValue('area')} style={{ width: 130 }} options={[]} /> */}
                      <QueriesSelect />
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
            );
          })}

          <Form.Item>
            <Popover
              content={<TabTablesQueries setOpenTable={setOpenTable} add={add} fieldsLength={fields.length || 0} />}
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
