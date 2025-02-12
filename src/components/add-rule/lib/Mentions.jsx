import {
  Select,
  DatePicker,
  Row,
  Col,
  Divider,
  Button,
  Collapse,
  Form,
} from "antd";
import { useState } from "react";

const { RangePicker } = DatePicker;
const { Item } = Form;

function Mentions({ form, activePanel }) {
  const [show, setShow] = useState(false);

  const items = [
    {
      key: "1",
      label: "This is panel header 1",
      children: (
        <Item
          name="select1"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="Select an option"
          />
        </Item>
      ),
    },
    {
      key: "2",
      label: "This is panel header 2",
      children: (
        <Item
          name="select2"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="Select an option"
          />
        </Item>
      ),
    },
    {
      key: "3",
      label: "This is panel header 3",
      children: (
        <Item
          name="select3"
          rules={[{ required: true, message: "Please select an option!" }]}
        >
          <Select
            style={{ width: 200 }}
            allowClear
            options={[
              { value: "lucy", label: "Lucy" },
              { value: "john", label: "John" },
              { value: "due", label: "Duo" },
            ]}
            placeholder="Select an option"
          />
        </Item>
      ),
    },
  ];

  return (
    <div>
      <Form form={form}>
        <Row gutter={16}>
          <Col>
            <Item
              name="initialSelect"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select
                style={{ width: 200 }}
                allowClear
                options={[
                  { value: "lucy", label: "Lucy" },
                  { value: "john", label: "John" },
                  { value: "due", label: "Duo" },
                ]}
                placeholder="Select an option"
              />
            </Item>
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
            <Item
              name="select4"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select
                style={{ width: 200 }}
                allowClear
                options={[
                  { value: "lucy", label: "Lucy" },
                  { value: "john", label: "John" },
                  { value: "due", label: "Duo" },
                ]}
                placeholder="Select an option"
              />
            </Item>
          </Col>
          <Col span={6}>
            <Item
              name="select5"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select
                style={{ width: 200 }}
                allowClear
                options={[
                  { value: "lucy", label: "Lucy" },
                  { value: "john", label: "John" },
                  { value: "due", label: "Duo" },
                ]}
                placeholder="Select an option"
              />
            </Item>
          </Col>
          <Col span={6}>
            <Item
              name="select6"
              rules={[{ required: true, message: "Please select an option!" }]}
            >
              <Select
                style={{ width: 200 }}
                allowClear
                options={[
                  { value: "lucy", label: "Lucy" },
                  { value: "john", label: "John" },
                  { value: "due", label: "Duo" },
                ]}
                placeholder="Select an option"
              />
            </Item>
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
      </Form>
    </div>
  );
}

export default Mentions;
