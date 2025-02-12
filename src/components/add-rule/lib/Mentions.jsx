import { Select, DatePicker, Row, Col, Divider, Button, Collapse } from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;

function Mentions() {
  const [show, setShow] = useState(false);

  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: (
        <Select
          defaultValue="lucy"
          style={{ width: 200 }}
          allowClear
          options={[
            { value: "lucy", label: "Lucy" },
            { value: "john", label: "John" },
            { value: "due", label: "Duo" },
          ]}
          placeholder="Select an option"
        />
      ),
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: (
        <Select
          defaultValue="lucy"
          style={{ width: 200 }}
          allowClear
          options={[
            { value: "lucy", label: "Lucy" },
            { value: "john", label: "John" },
            { value: "due", label: "Duo" },
          ]}
          placeholder="Select an option"
        />
      ),
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: (
        <Select
          defaultValue="lucy"
          style={{ width: 200 }}
          allowClear
          options={[
            { value: "lucy", label: "Lucy" },
            { value: "john", label: "John" },
            { value: "due", label: "Duo" },
          ]}
          placeholder="Select an option"
        />
      ),
    },
  ];

  return (
    <div>
      <Row gutter={16}>
        <Col>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="select it"
          />
        </Col>

        <Col>
          <RangePicker />
        </Col>
      </Row>

      <Row>
        <Col span={24}>
          <Divider />
        </Col>
      </Row>
      <Row>
        <Col span={6}>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="select it"
          />
        </Col>
        <Col span={6}>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="select it"
          />
        </Col>
        <Col span={6}>
          <Select
            defaultValue="lucy"
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="select it"
          />
        </Col>
        <Button type="primary" onClick={() => setShow(!show)}>
          Filter
        </Button>
      </Row>

      {show && (
        <Row>
          <Col span={24}>
            <Collapse accordion items={items} />
          </Col>
        </Row>
      )}
    </div>
  );
}

export default Mentions;
