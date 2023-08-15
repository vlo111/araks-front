// import { PlusOutlined } from '@ant-design/icons';
import { Form } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { TabTablesQueries } from 'pages/data-sheet/components/all-data-queries/tab-tables-queries';
import { useEffect, useRef } from 'react';
// import { useState } from 'react';
import { PropertySection } from './property-section';
import { Buttons } from '../../../pages/project-visualisation/components/buttons';

type Props = {
  openTable: boolean;
  setOpenTable: (openTable: boolean) => void;
  isVisualisation?:boolean
};

export const QueriesForm = ({ openTable, setOpenTable,isVisualisation = false }: Props) => {
  // const [openTable, setOpenTable] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [form] = Form.useForm();

  // const handleOpenChange = (newOpen: boolean) => {
  //   setOpenTable(newOpen);
  // };
  useEffect(() => {
    if (openTable && ref.current) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [openTable]);

  const onFinish = (values: unknown) => {
    // eslint-disable-next-line no-console
    console.log('values', values);
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Form.List name="queries">
        {(fields, { add, remove }) => (
          <VerticalSpace>
            {fields.map((field) => {
              return <PropertySection key={field.key} remove={() => remove(field.name)} fieldName={field.name} isVisualisation={isVisualisation} />;
            })}

            {/* <Form.Item>
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
                Add
              </Button>
            </Popover>
          </Form.Item> */}
            <div ref={ref}>
              {openTable && (
                <TabTablesQueries setOpenTable={setOpenTable} add={add} fieldsLength={fields.length || 0} />
              )}
            </div>

            {isVisualisation && <Buttons setOpenTable={setOpenTable} />}
          </VerticalSpace>

        )}
      </Form.List>
    </Form>
  );
};
