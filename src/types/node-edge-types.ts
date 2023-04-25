import { PropertyTypes } from 'components/form/property/types';

export type NodeEdgeTypeProperties = {
  inverse: boolean;
  multiple: boolean;
};

export type NodeEdgeTypesSubmit = {
  project_id: string;
  name: string;
  target_id: string;
  target_attribute_id: string;
  source_id: string;
  source_attribute_id: string;
  properties: NodeEdgeTypeProperties;
  ref_property_type_id?: PropertyTypes.Connection;
};
