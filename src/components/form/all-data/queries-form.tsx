// import { PlusOutlined } from '@ant-design/icons';
import { Form, Popover } from 'antd';
import { VerticalSpace } from 'components/space/vertical-space';
import { TabTablesQueries } from 'pages/data-sheet/components/all-data-queries/tab-tables-queries';
// import { useState } from 'react';
import { PropertySection } from './property-section';

type Props = {
  openTable: boolean;
  setOpenTable: (openTable: boolean) => void;
  clearFilter?: () => void;
  isVisualisation?: boolean;
};

export const QueriesForm = ({ openTable, setOpenTable, isVisualisation = false, clearFilter }: Props) => {
  const handleOpenChange = (newOpen: boolean) => {
    setOpenTable(newOpen);
  };

  const popoverStyle = isVisualisation ? { width: '460px', height: '500px' } : { width: '90%', height: '50%' };
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
      {(fields, { add, remove }) => {
        return (
          <VerticalSpace>
            {fields.map((field) => {
              return (
                <PropertySection
                  key={field.key}
                  remove={() => {
                    remove(field.name);
                    clearFilter?.();
                  }}
                  fieldName={field.name}
                  isVisualisation={isVisualisation}
                />
              );
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
              arrow={false}
              autoAdjustOverflow
              placement="top"
              trigger="click"
              open={openTable}
              onOpenChange={handleOpenChange}
              getPopupContainer={() => document.getElementById('queries-form-body') as HTMLElement}
              overlayInnerStyle={{ width: '90%', maxHeight: '500px', overflow: 'auto' }}
              overlayStyle={popoverStyle}
              content={
                <TabTablesQueries
                  setOpenTable={setOpenTable}
                  add={add}
                  fieldsLength={fields.length || 0}
                  isVisualisation={isVisualisation}
                />
              }
            >
              <div />
            </Popover>
          </VerticalSpace>
        );
      }}
    </Form.List>
  );
};
