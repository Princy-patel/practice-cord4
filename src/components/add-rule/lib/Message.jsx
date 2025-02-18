import { CalendarOutlined } from "@ant-design/icons";
import { Card, Col, DatePicker, Popover, Row, Skeleton } from "antd";
import dayjs from "dayjs";
import { useState, useEffect } from "react";

function Message() {
  const [selectedDates, setSelectedDates] = useState({
    today: [dayjs().startOf("day"), dayjs().endOf("day")],
    yesterday: [
      dayjs().add(-1, "d").startOf("day"),
      dayjs().add(-1, "d").endOf("day"),
    ],
    last_7_days: [dayjs().add(-7, "d"), dayjs()],
    last_30_days: [dayjs().add(-30, "d"), dayjs()],
  });

  const [loading, setLoading] = useState({
    today: false,
    yesterday: false,
    last_7_days: false,
    last_30_days: false,
  });

  const [cardData, setCardData] = useState({
    today: "",
    yesterday: "",
    last_7_days: "",
    last_30_days: "",
  });

  const data = {
    today: { sales: "", leads: "", visitors: "", users: "", value: "Today" },
    yesterday: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "Yesterday",
    },
    last_7_days: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "Last 7 Days",
    },
    last_30_days: {
      sales: "",
      leads: "",
      visitors: "",
      users: "",
      value: "Last 30 Days",
    },
  };

  /**
   * callApi:
   * @param {string} cardKey - key for the card. If omitted, then do an initial load.
   * @param {boolean} isInitial - optional flag. If true, load entire data state.
   */
  const callApi = (cardKey, isInitial = false) => {
    if (isInitial) {
      // Set a global loading state if you wish (or set loading for each card)
      setLoading({
        today: true,
        yesterday: true,
        last_7_days: true,
        last_30_days: true,
      });

      setTimeout(() => {
        setCardData({ ...data });
        setLoading({
          today: false,
          yesterday: false,
          last_7_days: false,
          last_30_days: false,
        });
      }, 1500);
    } else if (cardKey) {
      setLoading((prev) => ({ ...prev, [cardKey]: true }));
      setTimeout(() => {
        setCardData((prev) => ({
          ...prev,
          [cardKey]: data[cardKey],
        }));
        setLoading((prev) => ({ ...prev, [cardKey]: false }));
      }, 1500);
    }
  };

  useEffect(() => {
    callApi(null, true);
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

  const onDateChange = (dates, dateStrings, cardKey) => {
    if (!dates) return;

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
          title={cardKey.replace(/_/g, " ")}
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
          {loading[cardKey] ? (
            <Skeleton active />
          ) : (
            <p>{cardData[cardKey]?.value}</p>
          )}
        </Card>
      </Col>
    );
  };

  return (
    <Row gutter={16}>
      {["today", "yesterday", "last_7_days", "last_30_days"].map((cardKey) =>
        renderCard(cardKey)
      )}
    </Row>
  );
}

export default Message;
