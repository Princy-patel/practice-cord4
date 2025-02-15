import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Popover, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

const fetchDataFromAPI = async (cardKey, selectedDate) => {
  console.log(`API called for ${cardKey} with date range:`, selectedDate);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(selectedDate);
    }, 1000);
  });
};

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

  const rangePresets = [
    { label: "Today", value: [dayjs().startOf("day"), dayjs().endOf("day")] },
    {
      label: "Yesterday",
      value: [
        dayjs().add(-1, "d").startOf("day"),
        dayjs().add(-1, "d").endOf("day"),
      ],
    },
    { label: "Last 7 Days", value: [dayjs().add(-7, "d"), dayjs()] },
    { label: "Last 30 Days", value: [dayjs().add(-30, "d"), dayjs()] },
  ];

  const onRangeChange = async (dates, dateStrings, cardKey) => {
    if (dates) {
      setSelectedDates((prevState) => ({
        ...prevState,
        [cardKey]: dates,
      }));

      const updatedData = await fetchDataFromAPI(cardKey, dates);
      setSelectedDates((prevState) => ({
        ...prevState,
        [cardKey]: updatedData,
      }));
    } else {
      setSelectedDates((prevState) => ({
        ...prevState,
        [cardKey]: null,
      }));
    }
  };

  const renderCard = (day, cardKey) => {
    return (
      <Col span={6}>
        <Card
          title={day}
          extra={
            <Popover
              content={
                <DatePicker.RangePicker
                  presets={rangePresets}
                  value={selectedDates[cardKey]}
                  onChange={(dates, dateStrings) =>
                    onRangeChange(dates, dateStrings, cardKey)
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
            <p>
              {selectedDates[cardKey]
                ? `From: ${selectedDates[cardKey][0].format(
                    "YYYY-MM-DD"
                  )} To: ${selectedDates[cardKey][1].format("YYYY-MM-DD")}`
                : "No date selected"}
            </p>
          </div>
        </Card>
      </Col>
    );
  };

  return (
    <Row gutter={16}>
      {renderCard("Today", "card1")}
      {renderCard("Yesterday", "card2")}
      {renderCard("Last 7 Days", "card3")}
      {renderCard("Last 30 Days", "card4")}
    </Row>
  );
}

export default Message;
