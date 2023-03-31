import React, { useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Layout, Menu } from "antd";
import { MdDashboard, MdBed } from "react-icons/md";
import { FaHotel } from "react-icons/fa";
import { BsCartCheckFill } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { HiTemplate } from "react-icons/hi";
import { Outlet, useNavigate } from "react-router-dom";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { useDispatch, useSelector } from "react-redux";
import { setlogout } from "../Store/Slices/AuthSlice";
const { Header, Sider, Content } = Layout;

const Mainlayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const link = useNavigate();
  const { user, islogin } = useSelector((s) => s.Auth);
  const dispatch = useDispatch();
  const authenticated = () => {
    if (islogin) {
      confirmAlert({
        title: "Logout",
        message: "Are you sure you want to logout?.",
        buttons: [
          {
            label: "Yes",
            onClick: async () => {
              dispatch(setlogout());
              localStorage.clear();
            },
          },
          {
            label: "No",
          },
        ],
      });
    }
  };
  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo d-flex align-items-center justify-content-center">
          <h4 className="text-white text-center mb-0">Admin</h4>
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={[""]}
          onClick={({ key }) => {
            if (key === "signout") {
            } else {
              link(key);
            }
          }}
          items={[
            {
              key: "",
              icon: <MdDashboard className="fs-4" />,
              label: "Dashboard",
            },
            {
              key: "addhotels",
              icon: <FaHotel className="fs-4" />,
              label: "Add Hotels",
            },
            {
              key: "hotelslist",
              icon: <HiTemplate className="fs-4" />,
              label: "Hotels List",
            },
            {
              key: "addrooms",
              icon: <MdBed className="fs-4" />,
              label: "Add Rooms",
            },
            {
              key: "roomlist",
              icon: <BiCategoryAlt className="fs-4" />,
              label: "Rooms List",
            },
            {
              key: "reservation",
              icon: <BsCartCheckFill className="fs-4" />,
              label: "Reservation",
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 0,
            background: "black",
            color: "white",
          }}
        >
          {React.createElement(
            collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              className: "trigger",
              onClick: () => setCollapsed(!collapsed),
            }
          )}

          <div className="me-5 d-flex align-items-center gap-1">
            <div className="dropdown">
              <AccountCircleIcon className="fs-1" />
              <span
                onClick={authenticated}
                className="mb-0 dropdown-content fs-6"
              >
                logout
              </span>
            </div>
            <div className="d-flex flex-column justify-content-center">
              <h5 className="mb-0 fs-6">{user?.fullname}</h5>
              <h6 className="mb-0 fs-6">{user?.email}</h6>
            </div>
          </div>
        </Header>
        <Content
          style={{
            margin: "24px 16px",
            padding: 24,
            minHeight: 280,
            background: "#cccccc69",
          }}
        >
          <Outlet />
         
        </Content>
      </Layout>
    </Layout>
  );
};

export default Mainlayout;
