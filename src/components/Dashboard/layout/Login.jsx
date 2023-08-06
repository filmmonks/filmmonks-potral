import { useState } from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import styled from "styled-components";
import {
  useSignInWithGoogle,
  useSignInWithEmailAndPassword,
  useAuthState,
} from "react-firebase-hooks/auth";
// import image from  "../../../assets/Black Simple YouTube Thumbnail"
import auth from "../../../firebase.init";
import backgroundImage from "../../../assets/bg.png";
import { Link, useNavigate } from "react-router-dom";
const LoginPage = () => {
  const [loading, setLoading] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  if (user) {
    navigate("/dashboard");
  }
  const handleLogin = (values) => {
    setLoading(true);
    console.log(values);
    if (user) {
      navigate("/dashboard");
    }
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      signInWithEmailAndPassword(values.email, values.password);
    }, 1500);
  };

  const [signInWithGoogle] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);

  return (
    <LoginWrapper>
      <div className="login-page">
        <div className="login-form">
          <h2>Login</h2>
          <Form name="login-form" onFinish={handleLogin}>
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Please enter your email" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Email" />
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
            <Form.Item>
              <Button htmlType="submit" loading={loading} block>
                Log in
              </Button>
            </Form.Item>
            <Form.Item>
              <Button block onClick={() => signInWithGoogle()}>
                Sign In With Google
              </Button>
            </Form.Item>
          </Form>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            {" "}
            <Link to="/register"> Create An Account </Link>
            <Link to="/reset-password">Forgot Password</Link>
          </div>
        </div>
      </div>
    </LoginWrapper>
  );
};

export const LoginWrapper = styled.div`
  .login-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: black;
    background-image: url(${backgroundImage});
    background-size: cover;
  }

  .login-form {
    width: 300px;
    background-color: #7c6c6ccc;
    padding: 20px;
    border-radius: 4px;
  }
`;

export default LoginPage;
