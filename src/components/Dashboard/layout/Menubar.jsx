import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  TeamOutlined,
  ClockCircleOutlined,
  PictureOutlined,
  FileTextOutlined,
} from "@ant-design/icons";

import { Button, Layout, Menu } from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import Home from "./section/Home";
import AboutForm from "./section/AboutForm";
import ShowreelForm from "./section/ShowreelForm";
import WorkTimelineForm from "./section/WorkTimeLineForm";
import MonksForm from "./section/MonksForm";
import TeamForm from "./section/TeamForm";
import TeamTable from "./Table/TeamTable";
import { signOut } from "firebase/auth";
import auth from "../../../firebase.init";
import ShowreelTable from "./Table/ShowreelTable";
import WorkTimelineTable from "./Table/WorkTimelineTable";
import HomeCoverTable from "./Table/HomeCoverTable";
import AboutTable from "./Table/AboutTable";
import MonksGalaryTable from "./Table/MonksGalaryTable";
import logo from "../../../assets/logo.png";
import logo1 from "../../../assets/logo1.png";
import { useNavigate } from "react-router-dom";
const { Header, Sider, Content } = Layout;
const Menubar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("");
  const navigate = useNavigate();
  const handleNavClick = (navKey) => {
    setSelectedNav(navKey);
  };

  const handleSignout = () => {
    signOut(auth);
    navigate("/");
  };

  const renderContent = () => {
    switch (selectedNav) {
      case "1":
        return (
          <div>
            <Home />
          </div>
        );
      case "2":
        return (
          <div>
            <AboutForm />
          </div>
        );
      case "3":
        return (
          <div>
            <ShowreelForm />
          </div>
        );

      case "5":
        return (
          <div>
            <WorkTimelineForm />
          </div>
        );
      case "6":
        return (
          <div>
            <MonksForm />
          </div>
        );
      case "7":
        return (
          <div>
            <TeamForm />
          </div>
        );
      case "8":
        return (
          <div>
            <HomeCoverTable />
          </div>
        );
      case "9":
        return (
          <div>
            <AboutTable />
          </div>
        );
      case "10":
        return (
          <div>
            <MonksGalaryTable />
          </div>
        );
      case "11":
        return (
          <div>
            <TeamTable />
          </div>
        );
      case "12":
        return (
          <div>
            <WorkTimelineTable />
          </div>
        );
      case "13":
        return (
          <div>
            <ShowreelTable />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <MenuWrapper>
      <Layout className="menu">
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            {collapsed ? (
              <img style={{ width: "40px" }} src={logo1} alt="" />
            ) : (
              <img style={{ width: "150px" }} src={logo} alt="" />
            )}
          </div>
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={["1"]}
            selectedKeys={[selectedNav]}
            onClick={({ key }) => handleNavClick(key)}
          >
            <Menu.Item key="8" icon={<UserOutlined />}>
              Home
            </Menu.Item>
            <Menu.Item key="9" icon={<FileTextOutlined />}>
              About
            </Menu.Item>
            <Menu.Item key="10" icon={<PictureOutlined />}>
              Monks Galary
            </Menu.Item>
            <Menu.Item key="11" icon={<TeamOutlined />}>
              Meet the Team
            </Menu.Item>
            <Menu.Item key="12" icon={<ClockCircleOutlined />}>
              Work Timeline
            </Menu.Item>
            <Menu.Item key="13" icon={<VideoCameraOutlined />}>
              Showreel Link
            </Menu.Item>

            <Menu.SubMenu key="14" icon={<UploadOutlined />} title="Upload">
              <Menu.Item key="1" icon={<UserOutlined />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<FileTextOutlined />}>
                About
              </Menu.Item>
              <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                ShowReel
              </Menu.Item>
              {/* <Menu.Item key="4" icon={<MailOutlined />}>
                Recent Works
              </Menu.Item> */}
              <Menu.Item key="5" icon={<ClockCircleOutlined />}>
                Work Timeline
              </Menu.Item>
              <Menu.Item key="6" icon={<PictureOutlined />}>
                Monks Gallery
              </Menu.Item>
              <Menu.Item key="7" icon={<TeamOutlined />}>
                Meet the Team
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <Button
            style={{
              position: "absolute",
              bottom: "5%",
              marginLeft: "50px",
            }}
            type="primary"
            onClick={handleSignout}
          >
            Sign Out
          </Button>
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: "0px 0px",
              padding: 24,
              minHeight: "90vh",
              background: "white",
              borderTop: "3px solid #001529",
            }}
          >
            {renderContent() ? (
              renderContent()
            ) : (
              <>
                {" "}
                <h1
                  style={{
                    fontSize: "2.5rem",
                    color: "#001529",
                    textAlign: "center",
                  }}
                >
                  Hello, Welcome to the Dashboard!
                </h1>
                <img
                  style={{ width: "100%" }}
                  src="https://img.freepik.com/premium-vector/filming-crew-semi-rgb-color-director-watching-screen-cameraman-with-equipment-sound-technicians-movie-creation-team_106317-1055.jpg?w=1380"
                  alt=""
                />
              </>
            )}
          </Content>
        </Layout>
      </Layout>
    </MenuWrapper>
  );
};
export default Menubar;

const MenuWrapper = styled.div`
  .menu {
    // height: 100vh;
  }
  .btn {
    display: block;
    margin: auto;
  }
  .ant-layout-header {
    height: 64px;
    padding-inline: 50px;
    color: rgba(0, 0, 0, 0.88);
    line-height: 64px;
    background: #ffffff;
  }

  .ant-layout-header > span {
    margin-left: 20px;
  }
  .logo {
    padding: 20px;
    border-bottom: 1px solid #001529;
  }
`;
