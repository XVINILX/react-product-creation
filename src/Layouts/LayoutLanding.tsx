import {
  Button,
  Drawer,
  Layout,
  Menu,
  Tooltip,
  Modal,
  Form,
  Input,
} from "antd";
import { useAuth } from "contexts/AuthContext";
import { ReactNode, useEffect, useState } from "react";
import { VscSignOut } from "react-icons/vsc";
import { MenuOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { loginUser, registerUser } from "services/authService";

const LayoutLandingPage: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { logout, isAuthenticated, login } = useAuth();
  const navigate = useNavigate();
  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 768);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [drawerVisible, setDrawerVisible] = useState<boolean>(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  const handleLogin = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const loginResponse = await loginUser({
        username: values.username,
        password: values.password,
      });

      if (loginResponse) {
        login(loginResponse);
      }
      setIsModalOpen(false); // Fecha o modal após login bem-sucedido
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  const handleRegister = async (values: {
    username: string;
    password: string;
  }) => {
    try {
      const registerResponse = await registerUser({
        username: values.username,
        email: values.username,
        password: values.password,
      });

      const loginResponse = await loginUser({
        username: values.username,
        password: values.password,
      });

      if (loginResponse) {
        login(loginResponse);
      }
      setIsModalOpen(false); // Fecha o modal após login bem-sucedido
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Layout style={{ minHeight: "100vh" }} className="bg-white">
      <Layout.Header
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        className="bg-skyblue"
      >
        <>
          <h1
            style={{
              fontFamily: "Montserrat",
              fontWeight: 300,
              fontSize: "25px",
              color: "white",
              textAlign: "left",
            }}
          >
            Sigma
            <b style={{ fontWeight: 800 }}> Test</b>
          </h1>
        </>

        <div>
          {isAuthenticated ? (
            <Tooltip title="Sair">
              <VscSignOut
                style={{ cursor: "pointer", color: "white" }}
                size={"20px"}
                onClick={() => logout()}
              />
            </Tooltip>
          ) : (
            <Button
              className="custom-button-primary"
              onClick={() => setIsModalOpen(true)}
            >
              ENTRAR
            </Button>
          )}
        </div>
      </Layout.Header>
      <Layout.Content
        style={{
          backgroundColor: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "start",
          padding: "50px",
          alignItems: "center",
        }}
      >
        {children}
      </Layout.Content>

      <Modal
        title={isRegisterMode ? "Register" : "Login"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <Form
          onFinish={isRegisterMode ? handleRegister : handleLogin}
          layout="vertical"
        >
          <Form.Item
            label="E-mail"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              {isRegisterMode ? "Register" : "Login"}
            </Button>
          </Form.Item>
          <Form.Item>
            <Button
              type="link"
              onClick={() => setIsRegisterMode(!isRegisterMode)}
            >
              {isRegisterMode
                ? "Already have an account? Login"
                : "Don't have an account? Register"}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default LayoutLandingPage;
