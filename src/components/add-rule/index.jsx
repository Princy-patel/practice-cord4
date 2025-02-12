import { Tabs } from "antd";
import Mentions from "./lib/Mentions";
import Groups from "./lib/Groups";
import Message from "./lib/Message";
import Notification from "./lib/Notification";

const TableItems = [
  {
    label: "Mentions",
    key: "mentions",
    children: <Mentions />,
  },
  {
    label: "Groups",
    key: "groups",
    children: <Groups />,
  },
  {
    label: "Message",
    key: "message",
    children: <Message />,
  },
  {
    label: "Notification",
    key: "notification",
    children: <Notification />,
  },
];

function Rulebook() {
  return (
    <Tabs defaultActiveKey="mentions" type="card" style={{ width: "100%" }}>
      {TableItems.map((item) => (
        <Tabs.TabPane
          key={item.key}
          tab={item.label}
          style={{ minWidth: "700px" }}
        >
          {item.children}
        </Tabs.TabPane>
      ))}
    </Tabs>
  );
}

export default Rulebook;
