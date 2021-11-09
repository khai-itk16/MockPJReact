import React from "react";
import { Form, Input, Button, notification, Radio } from "antd";
import { Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import apiRegisterAccount from "./../service/Register";

export default function Register() {
  const onFinish = (values) => {
    const data = {
      username: values?.username,
      phone: values?.phone,
      avatar: values?.upload[0]?.originFileObj,
      roleUser: values?.roleUser,
    };

    apiRegisterAccount(data)
      .then((res) => {
        console.log(res);
        if (!res.data.errorMessage) {
          notification["success"]({
            message: "Register successfully",
          });
        } else {
          notification["error"]({
            message: res.data.errorMessage,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        notification["error"]({
          message: "PhoneNumber is invalid.",
        });
      });
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const normFile = (e) => {
    console.log("Upload event:", e);

    if (Array.isArray(e)) {
      return e;
    }

    return e && e.fileList;
  };

  return (
    <div className="form-container">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          roleUser: "customer",
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          name="roleUser"
          label="Role user"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Radio.Group>
            <Radio value="customer">Customer</Radio>
            <Radio value="shop">Shop</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: "Please input your username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[
            {
              required: true,
              message: "Please input your phone number!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="upload"
          label="Upload"
          valuePropName="fileList"
          getValueFromEvent={normFile}
        >
          <Upload name="logo" listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
