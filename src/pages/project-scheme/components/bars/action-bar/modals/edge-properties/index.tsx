import React, { useState } from 'react';
import { ShowPropertyModal } from './show-properties';
import { CreatePropertyModal } from './create-property';
import { PropertyState } from './types/property';

export const AddEdgePropertyModal: React.FC = () => {
  const [openCreateProperty, setOpenCreateProperty] = useState<PropertyState>(false);

  const props = {
    openCreateProperty,
    setOpenCreateProperty,
  };

  return (
    <>
      <ShowPropertyModal {...props} />
      <CreatePropertyModal {...props} />
    </>
  );
};
