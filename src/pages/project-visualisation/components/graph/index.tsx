import React from 'react';
import { useGraphRef } from 'hooks/use-graph';
import { Wrapper } from './wrapper';

export const Graph: React.FC = () => <Wrapper ref={useGraphRef()} />;
