import { Dispatch, SetStateAction } from 'react';
import { SearchVisualization } from '../wrapper';
import { AutoCompleteShortest } from './auto-complete';

type Props = {
  setEnd: Dispatch<SetStateAction<string | undefined>>;
  search: string | undefined;
  setSearch: (search: string) => void;
};

export const ShortestPathSearch = ({ setEnd, search, setSearch }: Props) => {
  return (
    <>
      <SearchVisualization className="stretch">
        <AutoCompleteShortest search={search} setSearch={setSearch} setEnd={setEnd} />
      </SearchVisualization>
    </>
  );
};
