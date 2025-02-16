import { useEffect, useState } from "react";
import { makeApiCall } from "../api";
import { Select, Table } from "antd";

function Users() {
  const [users, setUsers] = useState([]);
  const [selectedData, setSelectedData] = useState([
    "firstName",
    "lastName",
    "email",
  ]);

  const options = ["firstName", "lastName", "email", "age"];

  useEffect(() => {
    async function fetchData() {
      const data = await makeApiCall("https://dummyjson.com/users?limit=0");
      setUsers(data?.users || []);
    }
    fetchData();
  }, []);

  const currentDate = new Date().toLocaleDateString();

  const columns = [
    {
      title: "First Name",
      dataIndex: "firstName",
      key: "firstName",
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      key: "lastName",
      sorter: (a, b) => a.lastName.localeCompare(b.lastName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
      sorter: (a, b) => a.age - b.age,
    },
  ];

  const filteredColumns = columns.filter((col) =>
    selectedData.includes(col.dataIndex)
  );

  return (
    <div>
      <Select
        mode="multiple"
        style={{ width: "100%", marginBottom: "16px" }}
        options={options.map((item) => ({ label: item, value: item }))}
        placeholder="Select Columns..."
        maxTagCount="responsive"
        value={selectedData}
        onChange={(selectedValues) => setSelectedData(selectedValues)}
      />
      <Table
        columns={filteredColumns}
        dataSource={users.map((user) => ({ ...user, key: user.id }))}
        bordered
        title={() => "User List"}
        showHeader={true}
        tableLayout="fixed"
        scroll={{ y: 400 }}
        sticky
        summary={() => (
          <Table.Summary fixed>
            <Table.Summary.Row>
              {filteredColumns.map((col, idx) => (
                <Table.Summary.Cell key={col.dataIndex} index={idx}>
                  {currentDate}
                </Table.Summary.Cell>
              ))}
            </Table.Summary.Row>
          </Table.Summary>
        )}
      />
    </div>
  );
}

export default Users;
