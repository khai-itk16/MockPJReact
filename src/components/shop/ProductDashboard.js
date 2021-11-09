import React, { useEffect, useState } from "react";
import { Col, Layout, Menu, Row } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import { Typography } from "antd";
import ShopProductList from "./ShopProductList";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import OrderReceiver from "./OrderReceiver";
import OrderDetail from "./OrderDetail";

const { Content, Sider } = Layout;

export default function ProductDashboard() {
  return (
    <Router>
      <Switch>
        <Row justify="space-between">
          <Col span={24} style={{ display: "inline-flex" }}>
            <Sider className="site-layout-background" width={200}>
              <Menu
                mode="inline"
                defaultSelectedKeys={["1"]}
                style={{ height: "100%" }}
              >
                <Menu.Item key="1" icon={<DatabaseOutlined />}>
                  Product List
                  <Link to="/shop" />
                </Menu.Item>
                <Menu.Item key="2" icon={<DatabaseOutlined />}>
                  Order List
                  <Link to="/shop-orders" />
                </Menu.Item>
              </Menu>
            </Sider>
            <Content
              style={{ padding: "0 24px", width: "calc(100vw - 280px)" }}
            >
              <Route path="/shop" component={ShopProductList} />
              <Route path="/shop-orders" component={OrderReceiver} />
              <Route
                path="/shop-orders-detail/:orderId"
                component={OrderDetail}
              />
            </Content>
          </Col>
        </Row>
      </Switch>
    </Router>
  );
}
