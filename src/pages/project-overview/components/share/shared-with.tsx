import { Avatar, List } from "antd";
import { Share } from "components/dropdown";
import { SHARE_OPTIONS } from "components/dropdown/constants";
import { Text } from "components/typography";
import { logedInUser } from "helpers/utils";
import { useIsXXlScreen } from "hooks/use-breakpoint";


export const SharedWith = () => {
  const isXll = useIsXXlScreen();
    const data = [
        {
            title: logedInUser?.email,
            value: SHARE_OPTIONS[2].value
        }
    ];
    return <List
    itemLayout={isXll ? "horizontal" : 'vertical'}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<Share defaultValue={item.value} />]}>
        <List.Item.Meta
          avatar={<Avatar src={`https://joesch.moe/api/v1/random?key=${index}`} />}
          title={<Text>{item.title}</Text>}
          description=" "
        />
      </List.Item>
    )}
  />
}