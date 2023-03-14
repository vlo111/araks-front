import { Avatar, List } from "antd";
import { Share } from "components/dropdown";
import { SHARE_OPTIONS } from "components/dropdown/constants";
import { Text } from "components/typography";
import { logedInUser } from "helpers/utils";
import { useIsXXlScreen } from "hooks/use-breakpoint";


export const SharedWith = () => {
  const isXXl = useIsXXlScreen();
    const data = [
        {
            title: logedInUser?.email,
            value: SHARE_OPTIONS[2].value,
            avatar: logedInUser?.avatar,
        }
    ];
    return <List
    itemLayout={isXXl ? "horizontal" : 'vertical'}
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item actions={[<Share defaultValue={item.value} />]}>
        <List.Item.Meta
          avatar={<Avatar src={item.avatar} />}
          title={<Text>{item.title}</Text>}
          description=" "
        />
      </List.Item>
    )}
  />
}