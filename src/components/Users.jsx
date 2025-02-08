import { useEffect, useState } from "react";
import { makeApiCall } from "../api";
import { Table } from "antd";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const data = await makeApiCall("https://dummyjson.com/users");

      console.log(data);
      setUsers(data);

      console.log(data);
    }
    fetchData();
  }, []);

  // const deleteProduct = async function (id) {
  //   await makeApiCall(`https://fakestoreapi.com/products/${id}`, "delete");
  //   const data = await makeApiCall("https://fakestoreapi.com/products");
  //   setUsers(data);
  // };

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "id",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
      // render: (text, record) => (
      //   <span onClick={deleteProduct.bind(null, record.id)}>{text}</span>
      // ),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "id",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "id",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "id",
      sorter: (a, b) => a.age - b.age,
    },
  ];

  return (
    <div>
      <Table
        columns={columns?.map((column) => ({ ...column }))}
        dataSource={users.users}
        bordered
        title={() => "Header"}
        footer={() => "Footer"}
        // pagination={true}
        showHeader={true}
        tableLayout="fixed"
      />
    </div>
  );
}

export default Users;
