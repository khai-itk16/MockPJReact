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
import React, { useEffect, useState } from "react";
import EditItemShopProduct from "../../service/EditItemShop";

export default function ModalEditItem(props) {
  console.log(props);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    console.log(values);
    const data = {
      ShopId: props?.currentShop?.value?.shopId,
      ItemId: props?.item.itemId,
      Name: values?.Name,
      Price: values?.Price,
      Image: values.upload ? values?.upload[0]?.originFileObj : null,
    };
    console.log(data);
    EditItemShopProduct(data)
      .then((res) => {
        if (!res.data.errorMessage) {
          notification["success"]({
            message: "Edit item successfully",
          });

          props.setIsModalEditVisible(false);
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
          message: "Edit item failed.",
        });
      });
  };

  const handleCancel = () => {
    props.setIsModalEditVisible(false);
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
      <Modal
        title="Edit Item"
        visible={props.isModalEditVisible}
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
          <Form.Item label="Name" name="Name" initialValue={props.item.name}>
            <Input />
          </Form.Item>

          <Form.Item label="Price" name="Price" initialValue={props.item.price}>
            <InputNumber
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
            <Upload
              name="Image"
              listType="picture"
              maxCount={1}
              defaultFileList={[
                {
                  status: "done",
                  url: `data:image/jpeg;base64,${props.item.image}`,
                },
              ]}
            >
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
