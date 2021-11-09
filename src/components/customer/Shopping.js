import React from "react";
import { Row, Col } from "antd";
import ProductList from "./ProductList";
import ShoppingCart from "./ShoppingCart";

export default function Shopping(props) {
  return (
    <Row>
      <Col span={24}>
        <ProductList {...props} />
      </Col>
    </Row>
  );
}
