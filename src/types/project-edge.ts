
interface IEdgeType {
  id: string;
  name: string;
  color: string
}

export type ProjectEdgeResponse = {
  id?: string;
  name: string;
  target_id: string;
  target_attribute_id?: string;
  source_id: string;
  source_attribute_id?: string;
  inverse: boolean;
  multiple: boolean;
  target?: IEdgeType
  source?: IEdgeType
};

export type ProjectEdgeForm = {
  name: string;
  source: string;
  target: string;
  inverse: boolean;
  multiple: boolean;
};
