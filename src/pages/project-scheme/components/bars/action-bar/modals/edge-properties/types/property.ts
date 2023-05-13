import React from 'react';

export type PropertyState = boolean | string;

export type OpenEditModal = (item: PropertyState) => void;

export type Props = React.FC<{
  openCreateProperty: PropertyState;
  setOpenCreateProperty: React.Dispatch<React.SetStateAction<PropertyState>>;
}>;
