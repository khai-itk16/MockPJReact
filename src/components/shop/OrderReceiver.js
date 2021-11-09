import React, { useEffect, useState } from "react";
import { Col, Row, Table } from "antd";
import { Typography } from "antd";
import { useSelector } from "react-redux";
import GetShopOrderList from "../../service/GetShopOrder";
import { Route, Link } from "react-router-dom";
import OrderDetail from "./OrderDetail";

const { Text } = Typography;

export default function OrderReceiver() {
  const currentShop = useSelector((state) => state.auth.value);
  const [orders, setOrders] = useState([]);

  const callAPI = async () => {
    const res = await GetShopOrderList(currentShop);
    console.log(res.data.orders);
    setOrders(res.data.orders);
    console.log(orders);
  };

  useEffect(() => {
    callAPI();
  }, []);

  const columns = [
    {
      title: "Customer Name",
      dataIndex: "customerName",
      key: "customerName",
    },
    {
      title: "Customer Phone",
      dataIndex: "customerPhoneNumber",
      key: "customerPhoneNumber",
    },
    {
      title: "Total Price",
      dataIndex: "totalPrice",
      key: "totalPrice",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <>
          {status == null ? (
            <Text type="secondary">Waiting</Text>
          ) : status == 0 ? (
            <Text type="danger">Cancel</Text>
          ) : status == 1 ? (
            <Text type="warning">In Process</Text>
          ) : (
            <Text type="success">Finished</Text>
          )}
        </>
      ),
    },
    ,
    {
      title: "Detail",
      dataIndex: "detail",
      key: "detail",
      render: (text, record) => (
        <>
          <Link to={`/shop-orders-detail/${record.orderId}`}>Detail</Link>
        </>
      ),
    },
  ];

  return (
    <Row>
      <Col span={24}>
        <Table columns={columns} dataSource={orders} />
      </Col>
    </Row>
  );
}
