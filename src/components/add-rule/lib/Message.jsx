import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Popover, Row } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

function Message() {
  const [selectedDates, setSelectedDates] = useState({
    card1: [dayjs().startOf("day"), dayjs().endOf("day")],
    card2: [
      dayjs().add(-1, "d").startOf("day"),
      dayjs().add(-1, "d").endOf("day"),
    ],
    card3: [dayjs().add(-7, "d"), dayjs()],
    card4: [dayjs().add(-30, "d"), dayjs()],
  });

  const [store_card_id, set_store_card_id] = useState(false);

  const [card_data, set_card_data] = useState({
    today: "",
    yesterday: "",
    last_7_days: "",
    last_30_days: "",
  });

  const [second_card, set_second_card] = useState({});

  const data = {
    today: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "today",
    },
    yesterday: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "yesterday",
    },
    last_7_days: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "last_7_days",
    },
    last_30_days: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "last_30_days",
    },
  };

  const callApi = (cardKey) => {
    set_card_data({ ...data });
    if(store_card_id){
      set_card_data((prev) => ({
        ...prev,
        [cardKey]: ...apiFilled.response,
      }));
    }
    set_store_card_id(false);
  };

  useEffect(() => {
    callApi();
  }, []);

  const presetDefinitions = [
    {
      key: "today",
      label: "Today",
      value: [dayjs().startOf("day"), dayjs().endOf("day")],
    },
    {
      key: "yesterday",
      label: "Yesterday",
      value: [
        dayjs().add(-1, "d").startOf("day"),
        dayjs().add(-1, "d").endOf("day"),
      ],
    },
    {
      key: "last_7_days",
      label: "Last 7 Days",
      value: [dayjs().add(-7, "d"), dayjs()],
    },
    {
      key: "last_30_days",
      label: "Last 30 Days",
      value: [dayjs().add(-30, "d"), dayjs()],
    },
  ];

  const getPresets = (cardKey) => {
    const currentRange = selectedDates[cardKey];

    return presetDefinitions.map((preset) => {
      const isSelected =
        currentRange &&
        preset.value[0].isSame(currentRange[0], "day") &&
        preset.value[1].isSame(currentRange[1], "day");

      return {
        label: (
          <div
            style={{
              padding: "2px 6px",
              borderRadius: 4,
              backgroundColor: isSelected ? "orange" : "transparent",
              color: isSelected ? "#fff" : "inherit",
            }}
          >
            {preset.label}
          </div>
        ),
        value: preset.value,
      };
    });
  };

  const onDateChange = async (dates, dateStrings, cardKey) => {
    if (!dates) return;

    set_store_card_id(true);
    setSelectedDates((prev) => ({
      ...prev,
      [cardKey]: dates,
    }));

    callApi(cardKey);
  };

  const renderCard = (cardKey) => {
    return (
      <Col span={6} key={cardKey}>
        <Card
          title={cardKey}
          extra={
            <Popover
              content={
                <DatePicker.RangePicker
                  presets={getPresets(cardKey)}
                  value={selectedDates[cardKey]}
                  onChange={(dates, dateStrings) =>
                    onDateChange(dates, dateStrings, cardKey)
                  }
                  style={{ width: 250 }}
                />
              }
              title="Select Date Range"
              trigger="click"
            >
              <CalendarOutlined style={{ fontSize: 20, cursor: "pointer" }} />
            </Popover>
          }
          style={{ width: 300, border: "none" }}
        >
          <div>
            <p>{card_data[cardKey]?.value}</p>
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <Row gutter={16}>
      {["today", "yesterday", "last_7_days", "last_30_days"].map((cardKey) => {
        return renderCard(cardKey);
      })}
    </Row>
  );
}

export default Message;
