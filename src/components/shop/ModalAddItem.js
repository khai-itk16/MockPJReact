import { UploadOutlined } from "@ant-design/icons";
import {
  Form,
  Button,
  Col,
  Modal,
  Row,
  Input,
  Upload,
  InputNumber,
  notification,
} from "antd";
import React, { useState } from "react";
import AddItemShopProduct from "../../service/AddItemShop";

export default function ModalAddItem(props) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      ShopId: props?.currentShop?.value?.shopId,
      Name: values?.Name,
      Price: values?.Price,
      Image: values?.upload[0]?.originFileObj,
    };
    console.log(data);
    AddItemShopProduct(data)
      .then((res) => {
        if (!res.data.errorMessage) {
          notification["success"]({
            message: "Add item successfully",
          });
          props.setReloadAPI(!props.reloadAPI);
          setIsModalVisible(false);
          form.resetFields();
        } else {
          notification["error"]({
            message: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "Add item failed.",
        });
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <Row>
      <Col span={4} style={{ textAlign: "end" }}>
        <Button onClick={showModal}>Add Item</Button>
      </Col>
      <Modal
        title="Add item"
        visible={isModalVisible}
        onOk={form.submit}
        onCancel={handleCancel}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <Form.Item
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please input name item!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Price"
            name="Price"
            rules={[
              {
                required: true,
                message: "Please input price item!",
              },
            ]}
          >
            <InputNumber
              defaultValue={0}
              min={0}
              formatter={(value) =>
                `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
            />
          </Form.Item>

          <Form.Item
            name="upload"
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="Image" listType="picture" maxCount={1}>
              <Button icon={<UploadOutlined />}>Click to upload</Button>
            </Upload>
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item>
        </Form>
      </Modal>
    </Row>
  );
}
