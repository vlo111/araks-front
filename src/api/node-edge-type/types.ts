import { ProjectTypePropertyReturnData } from 'api/types';
import { EdgeType } from 'types/node';

export type EdgeTypeProperties = {
  id: string;
  multiple_type?: boolean;
  name: string;
  ref_property_type_id: string;
};

export type EdgeTypePropertiesResponse = {
  id: string;
  name: string;
  target_id: string;
  target_attribute_id: string;
  source_id: string;
  source_attribute_id: string;
  inverse: boolean;
  multiple: boolean;
  target: EdgeType;
  source: EdgeType;
  properties: ProjectTypePropertyReturnData[]; //needs to be changed
};
