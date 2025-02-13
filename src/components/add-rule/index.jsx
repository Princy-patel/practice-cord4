import { message, Tabs, Form } from "antd";
import Mentions from "./lib/Mentions";
import Groups from "./lib/Groups";
import Message from "./lib/Message";
import Notification from "./lib/Notification";
import { useEffect, useState } from "react";

function Rulebook() {
  const [activePanel, setActivePanel] = useState("mentions");
  const [form] = Form.useForm();

  const handlePanelChange = (key) => {
    form
      .validateFields()
      .then(() => {
        setActivePanel(key);
      })
      .catch((errorInfo) => {
        console.log("Validation failed:", errorInfo);
        message.error("Please fill out all required fields before proceeding.");
      });
  };

  const TableItems = [
    {
      label: "Mentions",
      key: "mentions",
      children: <Mentions form={form} />,
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

  return (
    <Tabs
      defaultActiveKey="mentions"
      type="card"
      style={{ width: "100%" }}
      items={TableItems}
      activeKey={activePanel}
      onChange={handlePanelChange}
    />
  );
}

export default Rulebook;
