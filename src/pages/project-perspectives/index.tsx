import { RenderSchema } from './render';
import { Wrapper } from './wrapper';
import { Toolbar } from "../../components/tool-bar";

export const ProjectPerspectives = () => {
  return (
    <>
      <Wrapper />
      <RenderSchema />
      <Toolbar position="left" />
    </>
  );
};
