import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useSelector } from "react-redux";

function UserProfile() {
  const [form] = Form.useForm();

  const userInfo = useSelector((state) => state.auth.user);

  const storedData = localStorage.getItem("userInfo");

  useEffect(() => {
    let initialData = null;
    if (storedData) {
      initialData = JSON.parse(storedData);
    } else if (userInfo) {
      initialData = {
        name: userInfo.name || "",
        email: userInfo.email || "",
        contactNumber: userInfo.contactNumber || "",
      };
    }

    if (initialData) {
      form.setFieldsValue(initialData); 
    }
  }, [userInfo, storedData, form]);

  const saveChanges = () => {
    form
      .validateFields()
      .then((values) => {
        localStorage.setItem("userInfo", JSON.stringify(values));
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-2">User Profile</h1>
      <div className="flex items-center justify-center">
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          autoComplete="off"
          className="p-6 bg-white w-[30%]"
        >
          <div className="space-y-2">
            <Form.Item
              label="Name"
              name="name"
              rules={[{ required: true, message: "Please input your Name!" }]}
            >
              <Input
                placeholder="Name"
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: "Please input your Email!",
                  type: "email",
                },
              ]}
            >
              <Input
                placeholder="Email"
                className="border-2 border-gray-300 rounded-md p-2 w-full"
              />
            </Form.Item>
          </div>

          <div className="space-y-2">
            <Form.Item
              label="Contact Number"
              name="contactNumber"
              rules={[
                {
                  required: false,
                  message: "Please input your contact number!",
                },
              ]}
            >
              <Input
                type="number"
                placeholder="Number"
                className="border-2 border-gray-300 rounded-md w-full mt-4"
              />
            </Form.Item>
          </div>

          <div className="text-right">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                onClick={saveChanges}
              >
                Save Changes
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UserProfile;
