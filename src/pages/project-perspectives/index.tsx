import { RenderSchema } from './components/render';
import { Perspectives } from './components/perspectives';
import { Toolbar } from "../../components/tool-bar";

export const ProjectPerspectives = () => {
  return (
    <>
      <Perspectives />
      <RenderSchema />
      <Toolbar position="left" />
    </>
  );
};
