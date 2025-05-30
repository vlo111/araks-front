import { Col, Drawer, Modal, Row, Steps } from 'antd';
import { Button } from 'components/button';
import { ImportCancelButton } from 'components/button/import-cancel-button';
import { SecondaryText } from 'components/typography';
import { ImportActionType, useImport } from 'context/import-context';
import { ImportClean } from 'pages/import/import-clean';
import { ImportCsv } from 'pages/import/import-csv';
import { ImportExcel } from 'pages/import/import-excel';
import { ImportMerge } from 'pages/import/import-merge';
import { ImportSetRules } from 'pages/import/import-set-rules';
import { CSSProperties } from 'react';
import styled from 'styled-components';

const StyledSteps = styled(Steps)`
  .ant-steps-item {
    .ant-steps-icon {
      color: #c3c3c3;
    }

    .ant-steps-item-icon {
      background-color: transparent;
      border-color: #c3c3c3;
    }

    .ant-steps-item-tail {
      &::after {
        height: 1.5px;
      }
    }

    .ant-steps-item-title .ant-typography {
      color: #c3c3c3;
      font-size: 16px;
      line-height: 24px;
      font-weight: 500px;
    }

    &.ant-steps-item-active {
      .ant-steps-icon {
        color: #ffffff;
      }

      .ant-steps-item-icon {
        background-color: #89d9b3;
        border-color: #89d9b3;
      }

      .ant-steps-item-tail {
        &::after {
          background: linear-gradient(270deg, #808080 0.27%, #89d9b3 99.42%);
        }
      }

      .ant-steps-item-title .ant-typography {
        color: #000;
        font-weight: 600px;
      }
    }

    &.ant-steps-item-finish {
      .ant-steps-icon {
        color: #ffffff;
      }

      .ant-steps-item-icon {
        background-color: #89d9b3;
        border-color: #89d9b3;
      }

      .ant-steps-item-tail {
        &::after {
          background: linear-gradient(270deg, #cde4d9 0.27%, #89d9b3 99.42%);
        }
      }

      .ant-steps-item-title .ant-typography {
        color: #89d9b3;
        font-weight: 600px;
      }
    }
  }
`;

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
    title: <SecondaryText>Set Rules</SecondaryText>,
    content: 'Last-content',
  },
  {
    title: <SecondaryText>Merging</SecondaryText>,
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
      onOk: () => dispatch({ type: ImportActionType.IMPORT_CLOSE, payload: {} }),
    });
  };

  return (
    <>
      <Drawer
        open={state.importSteps}
        title={<StyledSteps current={state.step} items={items} labelPlacement="vertical" />}
        footer={
          state.step !== 1 && state.step !== 3 ? (
            state.step === 4 ? (
              <Row justify="end" gutter={32}>
                <Col xs={4} xxl={2}>
                  <Button
                    block
                    type="primary"
                    onClick={() => {
                      dispatch({ type: ImportActionType.IMPORT_CLOSE, payload: {} });
                    }}
                  >
                    Ok
                  </Button>
                </Col>
              </Row>
            ) : (
              <Row justify="end" gutter={32}>
                <Col xs={4} xxl={2}>
                  <ImportCancelButton name="Cancel" type={ImportActionType.IMPORT_CLOSE} />
                </Col>
                <Col xs={4} xxl={2}>
                  <Button
                    block
                    type="primary"
                    disabled={state.step === 2 && (!state.mappingSaved || state.mappingHasWarning)}
                    onClick={() => {
                      let type = ImportActionType.IMPORT_CLEANING_STEP;
                      if (state.step === 2 && state.mappingSaved) {
                        type = !state.showMappingResult
                          ? ImportActionType.IMPORT_MAPPING_RESULT
                          : ImportActionType.IMPORT_SET_RULE;
                      }

                      dispatch({ type, payload: {} });
                    }}
                  >
                    Next
                  </Button>
                </Col>
              </Row>
            )
          ) : null
        }
        placement="top"
        closable={false}
        className="project-modal"
        onClose={handleCancel}
        getContainer={false}
        destroyOnClose
        headerStyle={headerStyle}
        contentWrapperStyle={{
          margin: '32px 24px',
          boxShadow: 'none',
          height: '800px',
          transform: 'translateY(0px)',
        }}
        bodyStyle={{ padding: '0px 0px 24px 24px' }}
        maskStyle={{ backgroundImage: 'linear-gradient(#C8CBDA80, #FFFFFF7D)', backdropFilter: 'blur(5px)' }}
      >
        <div style={{ position: 'relative', height: '100%' }}>
          {state.step === 3 ? (
            <ImportSetRules />
          ) : state.step === 4 ? (
            <ImportMerge />
          ) : (
            <>
              {state.isCSV ? <ImportCsv /> : <ImportExcel />}
              {state.step === 1 && <ImportClean />}
            </>
          )}
        </div>
      </Drawer>
    </>
  );
};
