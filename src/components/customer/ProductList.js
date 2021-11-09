import React, { Fragment, useEffect, useState } from "react";
import { Spin, List, Card, Button, Typography, Row, Col, Space } from "antd";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import no_image from "../../img/no_image.jpg";
import food from "../../img/food.jpg";
import { useDispatch, useSelector } from "react-redux";
import { addItem, minusItem } from "../../redux/slices/cartItemsSlice";
import GetShopProductList from "./../../service/GetShopProductList";
import { SHOP_ID } from "../../constant";

const { Meta } = Card;
const { Text } = Typography;

export default function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cartItems.value);
  console.log(cartItems);
  const [product, setProduct] = useState([]);

  useEffect(() => {
    GetShopProductList({ shopId: SHOP_ID })
      .then((res) => {
        console.log(res);
        setProduct(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addToCart = (item) => {
    let newItem = {
      id: item.itemId,
      name: item.name,
      image: item.image,
      price: item.price,
      quantity: 1,
    };
    dispatch(addItem(newItem));
  };

  const minusToCart = (item) => {
    let currentItem = {
      id: item.itemId,
    };
    dispatch(minusItem(currentItem));
  };

  return (
    <Fragment>
      <Row>
        <Col>
          <List
            grid={{ gutter: 16, column: 5 }}
            dataSource={product}
            renderItem={(item) => (
              <List.Item>
                <Card
                  className="custom-card"
                  cover={
                    <img
                      alt="product"
                      src={
                        item.image
                          ? `data:image/jpeg;base64,${item.image}`
                          : no_image
                      }
                    />
                  }
                  actions={[
                    !cartItems.some((e) => e.id === item.itemId) ? (
                      <Button type="primary" onClick={() => addToCart(item)}>
                        <PlusOutlined />
                        Add to Cart
                      </Button>
                    ) : (
                      <Space
                        align="center"
                        style={{
                          justifyContent: "space-around",
                          width: "100%",
                          height: 32,
                        }}
                      >
                        <MinusOutlined onClick={() => minusToCart(item)} />
                        <Text>
                          {cartItems.find((e) => e.id === item.itemId).quantity}
                        </Text>
                        <PlusOutlined onClick={() => addToCart(item)} />
                      </Space>
                    ),
                  ]}
                >
                  <Meta title={item.name} description={`$${item.price}`} />
                </Card>
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Fragment>
  );
}
