import { Button, Form, Input } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/slice/authSlice";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = localStorage.getItem("userData");

  useEffect(() => {
    if (user) {
      navigate("/");
    } else {
      navigate("/login");
    }
  }, [navigate, user]);

  // on Submit
  const onFinish = (values) => {
    if (values.email?.includes("admin")) {
      localStorage.setItem("userData", JSON.stringify(values));
      dispatch(setAuthUser(values));
      navigate("/users");
    } else {
      localStorage.setItem("userData", JSON.stringify(values));
      dispatch(setAuthUser(values));
      navigate("/");
    }
    message.success("Login successful");
  };

  const onFinishFailed = () => {
    message.info("Please check your Email and Password!");
    return;
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="shadow-md p-8 bg-white rounded-lg">
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <div className="flex flex-col gap-4">
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
              <Input placeholder="Email" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password placeholder="Password" />
            </Form.Item>
          </div>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
