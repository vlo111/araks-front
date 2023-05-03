export type EdgeTypeProperties = {
  id: string;
  multiple_type: boolean;
  name: string;
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
  target: {
    id: string;
    name: string;
    color: string;
  };
  source: {
    id: string;
    name: string;
    color: string;
  };
  properties: EdgeTypeProperties[]; //needs to be changed
};
