import React from 'react';
import { EdgeTypePropertiesResponse } from 'api/node-edge-type/types';
import styled from 'styled-components';

const List = styled.div`
  min-height: 32px;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.5rem 0;

  .text {
    font-weight: 600;
    letter-spacing: 0.07em;
    color: #ffffff;
  }
  
  .property-name {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .section {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1rem;
    height: 2rem;
    gap: 1rem;
    cursor: pointer;
    
    &:hover {
      //background: #61dafb;
      backdrop-filter: blur(1rem);
    }
  }
`;

export const EdgePropertyList: React.FC<{ list: EdgeTypePropertiesResponse | undefined }> = ({ list }) => {
  return (
    <List>
      {list?.properties?.map((p) => (
        <div key={p.id} className="section">
          <span className="text property-name" title={p.name}>{p.name}</span>
          <span className="text">{p.ref_property_type_id}</span>
        </div>
      ))}
    </List>
  );
};
