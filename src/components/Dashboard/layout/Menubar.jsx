import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  MailOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState } from "react";
import { styled } from "styled-components";
import Home from "./section/Home";
import AboutForm from "./section/AboutForm";
import ShowreelForm from "./section/ShowreelForm";
import WorkTimelineForm from "./section/WorkTimeLineForm";
import MonksForm from "./section/MonksForm";
import TeamForm from "./section/TeamForm";
import TeamTable from "./Table/TeamTable";
const { Header, Sider, Content } = Layout;
const Menubar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedNav, setSelectedNav] = useState("1");

  const handleNavClick = (navKey) => {
    setSelectedNav(navKey);
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
      case "4":
        return <div>Content 4</div>;
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
            <TeamTable />
          </div>
        ); // Add your content for Meet the Team here
      case "9":
        return <div>Content for Work Timeline</div>; // Add your content for Work Timeline here
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
              Meet the Team
            </Menu.Item>
            <Menu.Item key="9" icon={<UserOutlined />}>
              Work Timeline
            </Menu.Item>

            <Menu.SubMenu key="3" icon={<UploadOutlined />} title="Upload">
              <Menu.Item key="1" icon={<UserOutlined />}>
                Home
              </Menu.Item>
              <Menu.Item key="2" icon={<VideoCameraOutlined />}>
                About
              </Menu.Item>
              <Menu.Item key="3" icon={<VideoCameraOutlined />}>
                ShowReel
              </Menu.Item>
              <Menu.Item key="4" icon={<MailOutlined />}>
                Recent Works
              </Menu.Item>
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
              minHeight: 280,
            }}
          >
            {renderContent()}
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
