import React, { useEffect, useState } from "react";
import { List, Card, Typography, Steps } from "antd";

import getOrders from "../../service/GetOrder";
import Moment from "react-moment";
import { LoadingOutlined } from "@ant-design/icons";
import { HubConnectionBuilder, HttpTransportType } from "@microsoft/signalr";
import { domain } from "../../constants";

const { Title, Text } = Typography;
const { Step } = Steps;

export default function Order() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const [orders, setOrders] = useState([]);
  // const [connection, setConnection] = useState(null);

  // const connectRealtime = () => {
  //   const connect = new HubConnectionBuilder()
  //     .withUrl(url, {
  //       skipNegotiation: true,
  //       transport: HttpTransportType.WebSockets,
  //     })
  //     .withAutomaticReconnect()
  //     .build();

  //   setConnection(connect);
  // };

  useEffect(() => {
    getOrdersAPI();
  }, []);

  // useEffect(() => {
  //   if (connection) {
  //     connection
  //       .start()
  //       .then(() => {
  //         connection.on("ReceiveMessage", (message) => {
  //           console.log("message", message);
  //         });
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [connection]);

  const getOrdersAPI = async () => {
    try {
      let res = await getOrders(currentUser.customerId);
      console.log(res);
      let dataSort = res.data.orders.sort(
        (a, b) => new Date(b.orderTime) - new Date(a.orderTime)
      );
      setOrders(dataSort);
      console.log("orders", orders);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <List
        grid={{ gutter: 16, column: 1 }}
        dataSource={orders}
        renderItem={(item) => (
          <List.Item>
            <Card
              title={
                <>
                  <Title level={4}>
                    {item.shopName} - {item.phoneNumberOfShop}
                  </Title>
                  <Text type="secondary">
                    <Moment format="DD/MM/YYYY - HH:mm" withTitle>
                      {item.orderTime}
                    </Moment>
                  </Text>
                </>
              }
            >
              <>
                <Steps>
                  <Step
                    title="Waiting"
                    status={item.status === null ? "process" : "finish"}
                    icon={item.status === null ? <LoadingOutlined /> : null}
                  />
                  <Step
                    title="In Process"
                    status={
                      item.status === "1"
                        ? "process"
                        : item.status === "0"
                        ? "error"
                        : item.status === "2"
                        ? "finish"
                        : "wait"
                    }
                    icon={item.status === "1" ? <LoadingOutlined /> : null}
                  />
                  <Step
                    title="Finished"
                    status={item.status === "2" ? "finish" : "wait"}
                  />
                </Steps>
                <List
                  itemLayout="horizontal"
                  dataSource={item.itemsInCart}
                  renderItem={(cartitem) => (
                    <List.Item>
                      <List.Item.Meta
                        title={cartitem.itemName}
                        description={`${cartitem.amount} x ${
                          cartitem.price
                        } = $${cartitem.amount * cartitem.price}`}
                      />
                    </List.Item>
                  )}
                />
                <h2> Total: ${item.totalPrice}</h2>
              </>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
}
