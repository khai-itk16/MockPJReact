import { Layout, Menu, Avatar, Space } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { LogoutOutlined } from "@ant-design/icons";
import { removeUserId } from "../../redux/slices/authSlice";
import { removeCart } from "../../redux/slices/cartItemsSlice";

const { Header } = Layout;
const { SubMenu } = Menu;

export default function AppHeader() {
  const auth = useSelector((state) => state.auth.value);
  const history = useHistory();
  const dispatch = useDispatch();
  console.log("auth", auth);
  const logout = () => {
    dispatch(removeUserId(null));
    dispatch(removeCart(null));
    history.replace("/");
    localStorage.removeItem("cartId");
    localStorage.removeItem("currentUser");
    localStorage.removeItem("cartItems");
  };

  return (
    <Header>
      <div className="logo">
        <img
          src="https://www.repartienda.com/wp-content/themes/repartienda/assets/images/repartienda.png"
          alt=""
        />
      </div>

      <Menu
        theme="dark"
        mode="horizontal"
        defaultSelectedKeys={["home"]}
        style={{ lineHeight: "64px" }}
      >
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>

        {auth?.roleUser == "customer" && (
          <>
            <Menu.Item key="category">
              <Link to="/category/">Shopping</Link>
            </Menu.Item>

            <Menu.Item key="cart">
              <Link to="/cart/">Cart</Link>
            </Menu.Item>

            <Menu.Item key="order">
              <Link to="/order/">Order</Link>
            </Menu.Item>
          </>
        )}

        {auth?.roleUser == "shop" && (
          <Menu.Item key="shop">
            <Link to="/shop/">Dashboard</Link>
          </Menu.Item>
        )}

        {!auth ? (
          <Menu.Item key="login">
            <Link to="/login/">Login</Link>
          </Menu.Item>
        ) : (
          <SubMenu
            title={<Avatar src={`data:image/jpeg;base64,${auth.avatar}`} />}
          >
            <Menu.Item key="logout" onClick={logout}>
              <LogoutOutlined style={{ marginRight: 8 }} />
              Log out
            </Menu.Item>
          </SubMenu>
        )}
      </Menu>
    </Header>
  );
}
