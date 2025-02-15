import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Popover, Row } from "antd";
import dayjs from "dayjs";
import { useState } from "react";

function Message() {
  const [selectedDates, setSelectedDates] = useState({
    card1: null,
    card2: null,
    card3: null,
    card4: null,
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

  const onRangeChange = (dates, dateStrings, cardKey) => {
    if (dates) {
      setSelectedDates((prevState) => ({
        ...prevState,
        [cardKey]: dates,
      }));
    } else {
      setSelectedDates((prevState) => ({
        ...prevState,
        [cardKey]: null,
      }));
    }
  };

  const renderCard = (cardKey) => {
    return (
      <Col span={6}>
        <Card
          title="Card title"
          extra={
            <Popover
              content={
                <DatePicker.RangePicker
                  presets={rangePresets}
                  value={selectedDates[cardKey]} // Display the selected date range for this card
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
      {renderCard("card1")}
      {renderCard("card2")}
      {renderCard("card3")}
      {renderCard("card4")}
    </Row>
  );
}

export default Message;
