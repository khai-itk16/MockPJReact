import React, { useEffect, useState } from "react";
import {
  List,
  Table,
  Typography,
  Row,
  Col,
  Space,
  Image,
  notification,
} from "antd";
import { useParams } from "react-router";
import getOrderById from "./../../service/GetOrderById";
import { ZoomInOutlined } from "@ant-design/icons";
import { Select } from "antd";
import ChangeStatus from "../../service/ChangeStatus";

const { Option } = Select;
const { Text } = Typography;

export default function OrderDetail() {
  const { orderId } = useParams();
  console.log(orderId);
  const [cart, setCart] = useState([]);
  useEffect(() => {
    getOrderAPI();
  }, []);

  const getOrderAPI = async () => {
    try {
      let res = await getOrderById(orderId);
      console.log(res);

      setCart(res.data);
      console.log("cart", cart);
    } catch (e) {
      console.log(e);
    }
  };

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <Image
          preview={{
            mask: (
              <Space direction="vertical" align="center">
                <ZoomInOutlined />
              </Space>
            ),
          }}
          src={record.image ? `data:image/jpeg;base64,${record.image}` : ""}
          width={55}
        />
      ),
    },
    {
      title: "Item Name",
      dataIndex: "itemName",
      key: "itemName",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantity",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Sub Total",
      dataIndex: "subTotal",
      key: "subTotal",
      render: (text, record) => <p>${record.amount * record.price}</p>,
    },
  ];

  async function handleChange(value) {
    console.log(`selected ${value}`);
    const data = {
      orderId: orderId,
      orderStatus: value,
      customerId: cart.customerId,
      shopId: cart.shopId,
    };
    try {
      const res = await ChangeStatus(data);
      console.log(res);
      if (res) {
        notification["success"]({
          message: "Change staus successfully",
        });
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Row>
      <Col span={24}>
        <Space size="small" style={{ marginBottom: 16 }}>
          <Text>Order Staus</Text>
          <Select
            inputValue={"0"}
            style={{ width: 120 }}
            onChange={handleChange}
          >
            <Option value="0">Cancel</Option>
            <Option value="1">In Process</Option>
            <Option value="2">Finished</Option>
          </Select>
        </Space>
      </Col>
      <Col span={24}>
        <Table columns={columns} dataSource={cart.itemsInCart} />
      </Col>
      <Col span={24}>
        <h2> Total: ${cart.totalPrice}</h2>
      </Col>
    </Row>
  );
}
