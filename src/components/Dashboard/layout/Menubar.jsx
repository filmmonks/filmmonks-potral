import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
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

const { Header, Sider, Content } = Layout;
const Menubar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("");

  const handleNavClick = (navKey) => {
    setSelectedNav(navKey);
  };

  const handleSignout = () => {
    signOut(auth);
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
          <div className="logo" />
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
            <Menu.Item key="9" icon={<UserOutlined />}>
              About
            </Menu.Item>
            <Menu.Item key="10" icon={<UserOutlined />}>
              Monks Galary
            </Menu.Item>
            <Menu.Item key="11" icon={<UserOutlined />}>
              Meet the Team
            </Menu.Item>
            <Menu.Item key="12" icon={<UserOutlined />}>
              Work Timeline
            </Menu.Item>
            <Menu.Item key="13" icon={<UserOutlined />}>
              Showreel Link
            </Menu.Item>

            <Menu.SubMenu key="14" icon={<UploadOutlined />} title="Upload">
              <Menu.Item key="1" icon={<UserOutlined />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                About
              </Menu.Item>
              <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                ShowReel
              </Menu.Item>
              {/* <Menu.Item key="4" icon={<MailOutlined />}>
                Recent Works
              </Menu.Item> */}
              <Menu.Item key="5" icon={<MailOutlined />}>
                Work Timeline
              </Menu.Item>
              <Menu.Item key="6" icon={<MailOutlined />}>
                Monks Gallery
              </Menu.Item>
              <Menu.Item key="7" icon={<MailOutlined />}>
                Meet the Team
              </Menu.Item>
            </Menu.SubMenu>
          </Menu>
          <Button type="primary" onClick={handleSignout}>
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
              margin: "24px 16px",
              padding: 24,
              minHeight: "90vh",
            }}
          >
            {renderContent() ? (
              renderContent()
            ) : (
              <h1 style={{ fontSize: "3rem" }}>
                Hello, Welcome to the Dashboard!
              </h1>
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
    border: 1px solid white;
  }
`;
