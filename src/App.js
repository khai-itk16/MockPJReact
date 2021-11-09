import React, { Component, Fragment } from "react";

import { BrowserRouter as Router, Route } from "react-router-dom";
import { Layout } from "antd";
import AppHeader from "./components/Layout/AppHeader";
import Shopping from "./components/customer/Shopping";
import Login from "./components/Login";
import Register from "./components/Register";
import ProductDashboard from "./components/shop/ProductDashboard";
import ShoppingCart from "./components/customer/ShoppingCart";
import Order from "./components/customer/Order";
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const { Content, Footer } = Layout;

const Index = () => <p>Home</p>;

function App() {
  return (
    <Layout className="layout">
      <Router history={history}>
        <Fragment>
          <AppHeader />
          <Content style={{ padding: "0 20px" }}>
            <Layout style={{ padding: "24px 0", background: "#fff" }}>
              <Content
                style={{ padding: "0 24px", minHeight: "calc(100vh - 182px)" }}
              >
                <Route path="/" exact component={Index} />
                <Route path="/shop" component={ProductDashboard} />
                <Route path="/login/" component={Login} />
                <Route path="/register/" component={Register} />
                <Route path="/category/" component={Shopping} />
                <Route path="/cart/" component={ShoppingCart} />
                <Route path="/order/" component={Order} />
              </Content>
            </Layout>
          </Content>
          <Footer style={{ textAlign: "center" }}>ReactJS</Footer>
        </Fragment>
      </Router>
    </Layout>
  );
}

export default App;
