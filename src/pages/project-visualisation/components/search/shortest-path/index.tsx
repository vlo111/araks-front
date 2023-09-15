import { Dispatch, SetStateAction } from 'react';
import { SearchVisualization } from '../wrapper';
import { AutoCompleteShortest } from './auto-complete';

type Props = {
  setTarget: Dispatch<SetStateAction<{ id: string; typeName: string; name: string; color: string } | undefined>>;
  search: string | undefined;
  setSearch: (search: string) => void;
};

export const ShortestPathSearch = ({ setTarget, search, setSearch }: Props) => {
  return (
    <>
      <SearchVisualization className="stretch">
        <AutoCompleteShortest search={search} setSearch={setSearch} setTarget={setTarget} />
      </SearchVisualization>
    </>
  );
};
