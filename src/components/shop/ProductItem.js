import React, { useState } from "react";
import {
  Col,
  Image,
  List,
  notification,
  Popconfirm,
  Row,
  Space,
  Typography,
} from "antd";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/slices/cartItemsSlice";
import { ZoomInOutlined } from "@ant-design/icons";
import ModalEditItem from "./ModalEditItem";
import DeleteItemShopProduct from "./../../service/DeleteItemShop";

const { Meta } = List.Item;
const { Text } = Typography;

export default function ProductItem(props) {
  const dispatch = useDispatch();
  const [isModalEditVisible, setIsModalEditVisible] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState(null);
  const showModal = (item) => {
    setIsModalEditVisible(true);
    setIsItemSelected(item.itemId);
    console.log(isItemSelected);
  };
  console.log(props);

  const deleteItem = (item) => {
    let data = { shopId: props.currentShop.value.shopId, itemId: item.itemId };
    DeleteItemShopProduct(data)
      .then((res) => {
        if (!res.data.errorMessage) {
          notification["success"]({
            message: "Delete item successfully",
          });
          props.setReloadAPI(!props.reloadAPI);
        } else {
          notification["error"]({
            message: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Delete item failed.",
        });
      });
  };

  return (
    <Row>
      <Col span={24}>
        <List
          itemLayout="horizontal"
          dataSource={props.items}
          renderItem={(item) =>
            item.isActive && (
              <List.Item
                actions={[
                  <>
                    <a key="list-loadmore-edit" onClick={() => showModal(item)}>
                      edit
                    </a>
                    {item.itemId === isItemSelected && (
                      <ModalEditItem
                        isModalEditVisible={isModalEditVisible}
                        setIsModalEditVisible={setIsModalEditVisible}
                        setReloadAPI={props.setReloadAPI}
                        reloadAPI={props.reloadAPI}
                        item={item}
                        currentShop={props.currentShop}
                      />
                    )}
                  </>,
                  <Popconfirm
                    placement="top"
                    title={"Are you sure to delete this item?"}
                    onConfirm={() => deleteItem(item)}
                    okText="Yes"
                    cancelText="No"
                  >
                    <a key="list-loadmore-more" danger>
                      <Text type="danger">delete</Text>
                    </a>
                  </Popconfirm>,
                ]}
              >
                <Meta
                  avatar={
                    <Image
                      preview={{
                        mask: (
                          <Space direction="vertical" align="center">
                            <ZoomInOutlined />
                          </Space>
                        ),
                      }}
                      src={`data:image/jpeg;base64,${item.image}`}
                      width={55}
                    />
                  }
                  title={<a href="javascript:void(0)">{item.name}</a>}
                />
                <div>${item.price}</div>
              </List.Item>
            )
          }
        />
      </Col>
    </Row>
  );
}
