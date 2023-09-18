import { useParams } from 'react-router-dom';
import { CaretDownFilled } from '@ant-design/icons';
import { useMemo } from 'react';
import { useGetPerspectives } from '../../api/perspective/use-get-perspectives';
import { SelectItem } from '../form/share-input-item/select-item';

export const PerspectiveSelect = () => {
  const { id } = useParams();
  const { data } = useGetPerspectives({ id }, { enabled: !!id });

  const options = useMemo(() => (data || []).map((d) => ({ label: d.title, value: d.id })), [data]);

  return (
    <>
      {options.length > 0 && (
        <SelectItem
          name="perspective"
          popupClassName="perspective-dropdown"
          suffixIcon={<CaretDownFilled />}
          defaultValue={options[0].value}
          options={options}
        />
      )}
    </>
  );
};
