import { useState, useEffect, useContext } from "react";
import { Menu } from "antd";
import Link from "next/link";
import {
  AppstoreOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserAddOutlined,
  MenuOutlined,
  CarryOutOutlined,
  TeamOutlined,
} from "@ant-design/icons";

import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const { Item, ItemGroup, SubMenu } = Menu;

function topNav() {
  // Keep track of page user is on at any moment
  const [current, setCurrent] = useState("");

  const { state, dispatch } = useContext(Context);

  // Destructure user for conditionally
  // displaying nav links
  const { user } = state;

  const router = useRouter();

  useEffect(() => {
    // process.browser is deprecated
    typeof window !== "undefined" && setCurrent(window.location.pathname);
  }, [typeof window !== "undefined" && window.location.pathname]);

  const logout = async () => {
    dispatch({ type: "LOGOUT" });
    window.localStorage.removeItem("user");
    const response = await axios.get("/api/logout");
    toast.success(response.data.message);
    router.push("/login");
  };

  return (
    <Menu mode="horizontal" selectedKeys={[current]}>
      <Item
        key="/"
        onClick={(e) => setCurrent(e.key)}
        icon={<AppstoreOutlined />}
      >
        <Link href="/">
          <a>App</a>
        </Link>
      </Item>

      {user && user.role && user.role.includes("Instructor") ? (
        <Item
          key="/instructor/course/create"
          onClick={(e) => setCurrent(e.key)}
          icon={<CarryOutOutlined />}
        >
          <Link href="/instructor/course/create">
            <a>Create Course</a>
          </Link>
        </Item>
      ) : (
        <Item
          key="/user/become-instructor"
          onClick={(e) => setCurrent(e.key)}
          icon={<TeamOutlined />}
        >
          <Link href="/user/become-instructor">
            <a>Become Instructor</a>
          </Link>
        </Item>
      )}

      {user === null && (
        <>
          <Item
            key="/login"
            onClick={(e) => setCurrent(e.key)}
            icon={<LoginOutlined />}
          >
            <Link href="/login">
              <a>Login</a>
            </Link>
          </Item>
          <Item
            key="/register"
            onClick={(e) => setCurrent(e.key)}
            icon={<UserAddOutlined />}
          >
            <Link href="/register">
              <a>Register</a>
            </Link>
          </Item>
        </>
      )}

      {user !== null && (
        <SubMenu
          icon={<MenuOutlined />}
          title={user && user.name}
          className="float-end"
        >
          <ItemGroup>
            <Item key="/user">
              <Link href="/user">
                <a>Dashboard</a>
              </Link>
            </Item>
            <Item icon={<LogoutOutlined />} onClick={logout}>
              Logout
            </Item>
          </ItemGroup>
        </SubMenu>
      )}
    </Menu>
  );
}

export default topNav;
