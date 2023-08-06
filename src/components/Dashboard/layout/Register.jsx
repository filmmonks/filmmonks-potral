import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined, MailOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../../../firebase.init";
import backgroundImage from "../../../assets/bg.png";

const Register = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(values.email, values.password);
      setLoading(false);
    } catch (error) {
      console.error("Error creating user: ", error);
      setLoading(false);
    }
  };

  const [createUserWithEmailAndPassword] =
    useCreateUserWithEmailAndPassword(auth);
  const [signInWithGoogle] = useSignInWithGoogle(auth);

  return (
    <RegisterWrapper>
      <div className="register-page">
        <div className="register-form">
          <h2>Register</h2>
          <Form name="register-form" onFinish={handleRegister}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<MailOutlined />} placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please enter your password" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please enter your username" },
              ]}
            >
              <Input prefix={<UserOutlined />} placeholder="Username" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" loading={loading} block>
                Register
              </Button>
            </Form.Item>
            <Form.Item>
              <Button block onClick={() => signInWithGoogle()}>
                Sign In With Google
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </RegisterWrapper>
  );
};

const RegisterWrapper = styled.div`
  .register-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: black;
    background-image: url(${backgroundImage});
    background-size: cover;
  }

  .register-form {
    width: 300px;
    background-color: #7c6c6ccc;
    padding: 20px;
    border-radius: 4px;
  }
`;

export default Register;
