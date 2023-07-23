import { Col, Drawer, Modal, Row, Steps } from 'antd';
import { Button } from 'components/button';
import { ImportCancelButton } from 'components/button/import-cancel-button';
import { SecondaryText } from 'components/typography';
import { ImportActionType, useImport } from 'context/import-context';
import { ImportClean } from 'pages/import/import-clean';
import { ImportCsv } from 'pages/import/import-csv';
import { ImportExcel } from 'pages/import/import-excel';
import { CSSProperties } from 'react';

const steps = [
  {
    title: <SecondaryText>Import</SecondaryText>,
    content: 'First-content',
  },
  {
    title: <SecondaryText>Cleaning</SecondaryText>,
    content: 'Second-content',
  },
  {
    title: <SecondaryText>Mapping</SecondaryText>,
    content: 'Last-content',
  },
  {
    title: <SecondaryText>Merge</SecondaryText>,
    content: 'Last-content',
  },
  {
    title: <SecondaryText>Finish</SecondaryText>,
    content: 'Last-content',
  },
];

const headerStyle: CSSProperties = {
  border: '1px solid #F2F2F2',
  borderRadius: '4px',
  background: 'rgba(255, 255, 255, 0.60)',
  boxShadow: '0px 10px 10px 0px rgba(141, 143, 166, 0.20)',
  backdropFilter: 'blur(7px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  flexShrink: '0',
};

export const ImportStepsDrawer = () => {
  const { state, dispatch } = useImport();
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const handleCancel = () => {
    Modal.confirm({
      title: 'Are you sure you want to cancel current import process? All data will be cleared.',
      //   content: (
      //     <VerticalSpace>
      //       <Button type="primary" onClick={}>
      //         Confirm
      //       </Button>
      //       <Button type="default">Cancel</Button>
      //     </VerticalSpace>
      //   ),
      onOk: () => dispatch({ type: ImportActionType.IMPORT_CLOSE, payload: {} }),
      //   footer: null,
    });
  };

  return (
    <>
      <Drawer
        open={state.importSteps}
        title={<Steps current={state.step} items={items} labelPlacement="vertical" />}
        footer={
          state.step !== 1 ? (
            <Row justify="end" gutter={32}>
              <Col xs={4} xxl={2}>
                <ImportCancelButton name="Cancel" type={ImportActionType.IMPORT_CLOSE} />
              </Col>
              <Col xs={4} xxl={2}>
                <Button
                  block
                  type="primary"
                  disabled={state.step === 2 && !state.mapping}
                  onClick={() => {
                    let type = ImportActionType.IMPORT_CLEANING_STEP;
                    if (state.step === 2 && state.mapping) {
                      type = !state.showMappingResult
                        ? ImportActionType.IMPORT_MAPPING_RESULT
                        : ImportActionType.IMPORT_MAPPING_RESULT;
                    }
                    dispatch({ type, payload: {} });
                  }}
                >
                  Next
                </Button>
              </Col>
            </Row>
          ) : null
        }
        placement="top"
        closable={false}
        className="project-modal"
        onClose={handleCancel}
        getContainer={false}
        destroyOnClose
        // afterOpenChange={(open) => {
        //   if (!open) {
        //     handleCancel();
        //   }
        // }}
        headerStyle={headerStyle}
        contentWrapperStyle={{
          margin: '32px 24px',
          boxShadow: 'none',
          height: '800px',
          transform: 'translateY(0px)',
        }}
        bodyStyle={{ padding: '0px 0px 24px 24px' }}
        style={
          {
            // background: 'transparent',
          }
        }
        maskStyle={{ backgroundImage: 'linear-gradient(#C8CBDA80, #FFFFFF7D)', backdropFilter: 'blur(5px)' }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          {state.isCSV ? <ImportCsv /> : <ImportExcel />}
          {state.step === 1 && <ImportClean />}
        </div>
      </Drawer>
    </>
  );
};
