import React, { Fragment, useRef } from "react";
import {
  Affix,
  Card,
  List,
  Avatar,
  Button,
  Popconfirm,
  Image,
  Space,
  Row,
  Col,
  Input,
  notification,
} from "antd";

import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  minusItem,
  removeCart,
  removeItem,
} from "../../redux/slices/cartItemsSlice";
import food from "../../img/food.jpg";
import {
  DeleteOutlined,
  MinusOutlined,
  PlusOutlined,
  ZoomInOutlined,
} from "@ant-design/icons";
import submitCart from "../../service/SubmitCart";
import submitOrder from "../../service/Order";

const { TextArea } = Input;

export default function ShoppingCart() {
  const carts = useSelector((state) => state.cartItems.value);
  const cartId = localStorage.getItem("cartId");
  const deleveryInfoRef = useRef("");
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  const totalPrice = carts.reduce((total, item) => {
    return total + item.quantity * item.price;
  }, 0);

  const checkout = async () => {
    const items = carts.map((item) => {
      return {
        amount: item.quantity,
        itemId: item.id,
        isDeleted: false,
      };
    });

    console.log(items);

    const data = {
      items,
      customerId: currentUser.customerId,
      cartId,
    };
    console.log(data);

    try {
      const resCart = await submitCart(data);
      console.log(resCart);
      dispatch(removeCart(null));
    } catch (e) {
      console.log(e);
      notification["error"]({
        message: "Failed.",
      });
      return;
    }

    let deliveryInformation =
      deleveryInfoRef?.current?.resizableTextArea?.textArea?.value;
    const dataOrder = {
      cartId: cartId,
      deliveryInformation: deliveryInformation ? deliveryInformation : "_",
    };

    // console.log(deleveryInfoRef?.current?.resizableTextArea?.textArea?.value);

    try {
      const resOrder = await submitOrder(dataOrder);
      console.log(resOrder);
      notification["success"]({
        message: "Successfully",
      });
    } catch (e) {
      console.log(e);
      notification["error"]({
        message: "Failed.",
      });
    }
  };

  console.log(carts);
  const dispatch = useDispatch();

  return (
    <div className="form-container">
      <List
        itemLayout="horizontal"
        dataSource={carts}
        renderItem={(item) => (
          <List.Item
            actions={[
              item?.quantity > 1 && (
                <Button
                  type="primary"
                  icon={<MinusOutlined />}
                  onClick={() =>
                    dispatch(
                      minusItem({
                        id: item.id,
                      })
                    )
                  }
                />
              ),
              <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => dispatch(addItem({ ...item, quantity: 1 }))}
              />,
              <Popconfirm
                placement="top"
                title={"Are you sure to delete this item?"}
                onConfirm={() => dispatch(removeItem({ id: item.id }))}
                okText="Yes"
                cancelText="No"
              >
                <Button type="danger" icon={<DeleteOutlined />} />
              </Popconfirm>,
            ]}
          >
            <List.Item.Meta
              avatar={
                <Image
                  preview={{
                    mask: (
                      <Space direction="vertical" align="center">
                        <ZoomInOutlined />
                      </Space>
                    ),
                  }}
                  src={
                    item.image ? `data:image/jpeg;base64,${item.image}` : food
                  }
                  width={55}
                />
              }
              title={item.name}
              description={`${item.quantity} x ${item.price} = $${
                item.quantity * item.price
              }`}
            />
          </List.Item>
        )}
      />
      {carts?.length != 0 && (
        <Row>
          <Col span={18}>
            <h2> Total: ${totalPrice}</h2>
          </Col>
          <Col span={6} style={{ textAlign: "center" }}>
            {/* <Button onClick={checkout}>Check Out</Button> */}
          </Col>
          <Col span={18}>
            Delivery Information:
            <TextArea ref={deleveryInfoRef} rows={4} />
          </Col>
          <Col span={6} style={{ textAlign: "center", alignSelf: "center" }}>
            <Space align="center">
              <Button onClick={checkout}>Check Out</Button>
            </Space>
          </Col>
        </Row>
      )}
    </div>
  );
}
