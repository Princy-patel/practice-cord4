import { Button, InputNumber, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateQuantity } from "../redux/slice/productSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.product.product);

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const onChange = (value, record) => {
    dispatch(updateQuantity({ id: record.id, quantity: value }));
  };

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
      render: (quantity, record) => (
        <InputNumber
          min={1}
          defaultValue={quantity}
          onChange={(value) => onChange(value, record)}
        />
      ),
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (price, record) => (
        <span>{record.price * record.quantity}</span>
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

  return (
    <>
      <Table columns={columns} dataSource={cartProducts} />
      <p className="text-right text-2xl font-bold">
        Total: ₹ {totalPrice?.toFixed(2)}
      </p>
    </>
  );
};

export default Cart;
