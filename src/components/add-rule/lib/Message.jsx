import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Popover, Row } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

const fetchDataFromAPI = async (type, selectedDate) => {
  console.log(`API called for ${type} with date range:`, selectedDate);
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ type, data: `Fetched data for ${type}` });
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

  const [cardData, setCardData] = useState({
    card1: null,
    card2: null,
    card3: null,
    card4: null,
  });

  const [cardTitle, setCardTitle] = useState({
    card1: "Today",
    card2: "Yesterday",
    card3: "Last 7 Days",
    card4: "Last 30 Days",
  });

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

  useEffect(() => {
    const fetchInitialData = async () => {
      const initialData = {};
      for (const def of presetDefinitions) {
        const cardKey = getCardKeyFromType(def.key);
        if (cardKey) {
          initialData[cardKey] = await fetchDataFromAPI(def.key, def.value);
        }
      }
      setCardData(initialData);
    };
    fetchInitialData();
  }, []);

  const getCardKeyFromType = (type) => {
    switch (type) {
      case "today":
        return "card1";
      case "yesterday":
        return "card2";
      case "last_7_days":
        return "card3";
      case "last_30_days":
        return "card4";
      default:
        return null;
    }
  };

  const onRangeChange = async (dates, dateStrings, cardKey) => {
    if (dates) {
      setSelectedDates((prevState) => ({ ...prevState, [cardKey]: dates }));

      const matchingPreset = presetDefinitions.find(
        (preset) =>
          dates[0].isSame(preset.value[0], "day") &&
          dates[1].isSame(preset.value[1], "day")
      );
      const type = matchingPreset ? matchingPreset.key : "custom";

      setCardTitle((prevState) => ({
        ...prevState,
        [cardKey]: matchingPreset ? matchingPreset.label : "Custom Date",
      }));

      const updatedData = await fetchDataFromAPI(type, dates);
      setCardData((prevState) => ({ ...prevState, [cardKey]: updatedData }));
    } else {
      setSelectedDates((prevState) => ({ ...prevState, [cardKey]: null }));
      setCardTitle((prevState) => ({
        ...prevState,
        [cardKey]: "Custom Date",
      }));
    }
  };

  const renderCard = (cardKey) => {
    return (
      <Col span={6} key={cardKey}>
        <Card
          title={cardTitle[cardKey]}
          extra={
            <Popover
              content={
                <DatePicker.RangePicker
                  presets={getPresets(cardKey)}
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
            <p>
              {cardData[cardKey] ? cardData[cardKey].data : "Loading data..."}
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
