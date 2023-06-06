import { RenderSchema } from './components/graph';
import { Toolbar } from "../../components/tool-bar";
import { Section } from "./components/section";

export const ProjectPerspectives = () => {

  return (
    <>
      <Section />
      <RenderSchema />
      <Toolbar position="left" />
    </>
  );
};
