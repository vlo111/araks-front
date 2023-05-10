import { ConnectionPropertyTypes, PropertyTypes } from 'components/form/property/types';

export type NodeEdgeTypesSubmit = {
  project_id: string;
  name: string;
  target_id: string;
  source_id: string;
  source_attribute_id: string;
  inverse: boolean;
  multiple: boolean;
  ref_property_type_id?: PropertyTypes.Connection;
  propertyId?: string;
};

export type NodeEdgeTypePropertiesSubmit = {
  project_id: string;
  name: string;
  multiple: boolean;
  ref_property_type_id: ConnectionPropertyTypes;
  propertyId?: string;
};
