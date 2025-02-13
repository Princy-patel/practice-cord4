import { InputNumber, Select, Space, Table } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, updateQuantity } from "../redux/slice/productSlice";
import { MdDeleteOutline } from "react-icons/md";
import { useState } from "react";

const Cart = () => {
  const dispatch = useDispatch();
  const cartProducts = useSelector((state) => state.product.product);

  const options = ["id", "name", "price", "description", "quantity"];

  const [selectedData, setSelectedData] = useState(options.slice(0, 4));

  const totalPrice = cartProducts.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  const onChange = (value, record) => {
    dispatch(updateQuantity({ id: record.id, quantity: value }));
  };

  // Delete the product from the cart
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

  // Filter columns based on selectedData
  const filteredColumns = columns.filter((col) =>
    selectedData.includes(col.key)
  );

  return (
    <>
      <Select
        mode="multiple"
        style={{ width: "100%" }}
        options={options.map((item) => ({ label: item, value: item }))}
        placeholder="Select Columns..."
        maxTagCount="responsive"
        value={selectedData}
        onChange={(e) => setSelectedData(e)} // Update selected columns
      />
      <Table columns={filteredColumns} dataSource={cartProducts} />
      <p className="text-right text-2xl font-bold">
        Total: ₹ {totalPrice?.toFixed(2)}
      </p>
    </>
  );
};

export default Cart;
