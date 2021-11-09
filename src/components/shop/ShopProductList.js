import React, { useEffect, useState } from "react";
import { Col, Layout, Menu, Row } from "antd";
import { DatabaseOutlined } from "@ant-design/icons";
import ProductItem from "./ProductItem";
import ModalAddItem from "./ModalAddItem";
import { Typography } from "antd";
import GetShopProductList from "./../../service/GetShopProductList";
import { useSelector } from "react-redux";

const { Title } = Typography;

export default function ShopProductList() {
  const currentShop = useSelector((state) => state.auth);

  const [products, setProducts] = useState([]);
  const [reloadAPI, setReloadAPI] = useState(false);

  const callAPI = async () => {
    const res = await GetShopProductList(currentShop.value);
    console.log(res);
    setProducts(res.data);
    console.log(products);
  };

  useEffect(() => {
    callAPI();
  }, [reloadAPI]);

  return (
    <Row>
      <Col span={20}>
        <Title level={2}>{products?.name}</Title>
        <Title level={4}>{products?.phoneNumber}</Title>
      </Col>
      <Col span={4}>
        <ModalAddItem
          currentShop={currentShop}
          reloadAPI={reloadAPI}
          setReloadAPI={setReloadAPI}
        />
      </Col>
      <Col span={24}>
        <ProductItem
          currentShop={currentShop}
          reloadAPI={reloadAPI}
          setReloadAPI={setReloadAPI}
          items={products?.items}
        />
      </Col>
    </Row>
  );
}
