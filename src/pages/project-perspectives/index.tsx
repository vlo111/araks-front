import { RenderSchema } from './components/graph';
import { Toolbar } from "../../components/tool-bar";
import { Perspectives } from "./perspective";

export const ProjectPerspectives = () => {

  return (
    <>
      <Perspectives />
      <RenderSchema />
      <Toolbar position="left" />
    </>
  );
};
