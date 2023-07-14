import { InfoCircleOutlined } from '@ant-design/icons';
import { Button } from 'components/button';
import { Modal } from 'components/modal';
import { VerticalSpace } from 'components/space/vertical-space';
import { useEffect, useState } from 'react';
import { Form } from 'antd';
import { MenuText } from 'components/typography';
import { useCheckValidatePropertyType } from 'api/project-node-type-property/use-check-validate-property-type';
import { useParams } from 'react-router-dom';
import { useDataSheetWrapper } from 'components/layouts/components/data-sheet/wrapper';
import { PropertyTypes } from 'components/form/property/types';
import { CheckPropertyResponse } from 'api/types';
import { COLORS } from 'helpers/constants';

type Props = {
  id?: string;
  initPropertyType?: PropertyTypes;
};

const initiCheckData = {} as CheckPropertyResponse;

export const EditNodePropertyTypeInfoModal = ({ id, initPropertyType }: Props) => {
  const params = useParams();
  const { nodeTypeId } = useDataSheetWrapper();
  const [checkData, setCheckData] = useState<CheckPropertyResponse>(initiCheckData);

  const propertyType = Form.useWatch('ref_property_type_id');

  useEffect(() => {
    // When updating back to the same type then no need to show that message
    if (checkData && propertyType === initPropertyType) {
      setCheckData(initiCheckData);
    }
  }, [checkData, initPropertyType, propertyType]);

  const [open, setOpen] = useState(false);
  const form = Form.useFormInstance();

  const handleCancel = () => {
    setOpen(false);
    form.setFieldValue('ref_property_type_id', initPropertyType);
    setCheckData(initiCheckData);
  };

  const handleContinue = () => {
    form.submit();
  };

  // For edit data type, checks is it possible and on how many rows it will affect
  const { isInitialLoading: isCheckLoading } = useCheckValidatePropertyType(
    id || '',
    {
      project_id: params.id,
      project_type_id: nodeTypeId,
      ref_property_type_id: propertyType,
    },
    {
      // if type changed and not changed to the same as it was initially
      enabled: !!(propertyType && propertyType !== initPropertyType && id && nodeTypeId && params.id),
      onSuccess: (data) => {
        setCheckData(data);
      },
    }
  );

  return (
    <>
      <Modal
        title={<InfoCircleOutlined style={{ color: COLORS.PRIMARY.GRAY }} />}
        open={open}
        footer={false}
        closable={false}
        className="project-modal"
        destroyOnClose
        zIndex={2000}
        width={400}
      >
        <VerticalSpace size="large">
          <VerticalSpace size={0}>
            <MenuText>{`The ${checkData?.invalidCount} rows are error data. The system should delete the rows.`}</MenuText>
            <MenuText strong>Clean the Rows and Change type</MenuText>
          </VerticalSpace>
          <Button block onClick={handleContinue} type="primary">
            Continue
          </Button>
          <Button block type="default" onClick={handleCancel}>
            Cancel
          </Button>
        </VerticalSpace>
      </Modal>
      <Button
        block
        type="primary"
        onClick={() => (checkData?.allCount || checkData?.invalidCount ? setOpen(true) : form.submit())}
        disabled={isCheckLoading}
      >
        Save
      </Button>
    </>
  );
};
