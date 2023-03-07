import { getIconName } from "helpers/utils";
import IcoMoon, { iconList, IconProps } from "react-icomoon";
import iconSet from "./selection.json";

const Icon = (props: IconProps) => (
  <IcoMoon iconSet={iconSet} {...props} icon={getIconName(props.icon)} />
);

export const iconsList = iconList(iconSet);;

export default Icon;