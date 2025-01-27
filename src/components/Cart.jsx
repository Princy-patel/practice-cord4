import { Button, Space, Table } from "antd";
import { useSelector } from "react-redux";

const columns = [
  {
    title: "Id",
    dataIndex: "id",
    key: "id",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Name",
    dataIndex: "name",
    key: "name",
    render: (text) => <span>{text}</span>,
  },
  {
    title: "Price",
    dataIndex: "price",
    key: "price",
  },
  {
    title: "Description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "Quantity",
    dataIndex: "quantity",
    key: "quantity",
  },
  {
    title: "Image",
    dataIndex: "image",
    key: "image",
    render: (image) => (
      <img
        src={image}
        alt="product"
        style={{ width: "50px", height: "50px" }}
      />
    ),
  },
  {
    title: "Action",
    key: "action",
    render: (_, record) => (
      <Space size="middle">
        <Button type="primary">Edit</Button>
        <Button type="primary" danger>
          Delete
        </Button>
      </Space>
    ),
  },
];

const Cart = () => {
  const cartProducts = useSelector((state) => state.product.product);
  return <Table columns={columns} dataSource={cartProducts} />;
};

export default Cart;
