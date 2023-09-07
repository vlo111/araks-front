import { PropertyTypes } from 'components/form/property/types';
import { QueryFilterTypes } from 'components/select/queries-select';

export type VisualizationSubmitType = {
  operator: 'AND' | 'OR';
  queryArr: {
    type: 'node' | 'relation';
    label: string;
    project_edge_type_id?: string;
    action?: QueryFilterTypes;
    query: {
      [x: string]: {
        type: PropertyTypes;
        action: QueryFilterTypes;
        value: string;
      };
    };
  }[];
};
