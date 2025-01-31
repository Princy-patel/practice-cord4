import { InputNumber, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateQuantity } from "../redux/slice/productSlice";
import { MdDeleteOutline } from "react-icons/md";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.product.product);

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const onChange = (value, record) => {
    dispatch(updateQuantity({ id: record.id, quantity: value }));
  };

  // delete the product from the cart
  const onDelete = (id) => {
    dispatch(deleteProduct({ id }));
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
      render: (price, record) => <span>{record.price * record.quantity}</span>,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Space size="middle">
          <div onClick={onDelete.bind(null, record.id)}>
            <MdDeleteOutline size={26} color="red" cursor={"pointer"} />
          </div>
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
