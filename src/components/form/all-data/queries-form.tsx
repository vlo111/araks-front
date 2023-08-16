// import { PlusOutlined } from '@ant-design/icons';
import { Form, Popover } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { TabTablesQueries } from 'pages/data-sheet/components/all-data-queries/tab-tables-queries';
// import { useState } from 'react';
import { PropertySection } from './property-section';

type Props = {
  openTable: boolean;
  setOpenTable: (openTable: boolean) => void;
};

export const QueriesForm = ({ openTable, setOpenTable }: Props) => {
  // const [openTable, setOpenTable] = useState(false);
  // const ref = useRef<HTMLDivElement>(null);

  // const handleOpenChange = (newOpen: boolean) => {
  //   setOpenTable(newOpen);
  // };
  // useEffect(() => {
  //   if (openTable && ref.current) {
  //     ref.current.scrollIntoView({
  //       behavior: 'smooth',
  //       block: 'start',
  //     });
  //   }
  // }, [openTable]);

  return (
    <Form.List name="queries">
      {(fields, { add, remove }) => (
        <VerticalSpace>
          {fields.map((field) => {
            return <PropertySection key={field.key} remove={() => remove(field.name)} fieldName={field.name} />;
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
          <Popover
            open={openTable}
            placement="bottom"
            arrow={false}
            getPopupContainer={() => document.getElementById('queries-form-body') as HTMLElement}
            overlayStyle={{ width: '90%' }}
            destroyTooltipOnHide
            content={<TabTablesQueries setOpenTable={setOpenTable} add={add} fieldsLength={fields.length || 0} />}
          >
            <div />
          </Popover>
        </VerticalSpace>
      )}
    </Form.List>
  );
};
