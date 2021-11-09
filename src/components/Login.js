import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, notification } from "antd";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import apiLoginAccount from "./../service/Login";
import { storeUserId } from "../redux/slices/authSlice";
import { SHOP } from "../constants";
import IsExistCart from "../service/IsExistCart";
import { SHOP_ID } from "../constant";
import CreateCart from "../service/CreateCart";

export default function Login() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [cart, setCart] = useState(null);

  const createCart = async (cart) => {
    const isCartExist = await IsExistCart(cart);
    console.log(isCartExist);
    if (isCartExist?.data?.isSuccess) {
      localStorage.setItem("cartId", isCartExist?.data?.cartId);
      return;
    }
    const res = await CreateCart(cart);
    localStorage.setItem("cartId", res?.data?.cartId);
    return;
  };

  useEffect(() => {
    console.log(cart);
    createCart(cart);
  }, [cart]);

  const onFinish = (values) => {
    console.log("Success:", values);
    const dataReq = {
      phoneNumber: values?.phoneNumber,
      roleUser: values?.roleUser,
    };
    apiLoginAccount(dataReq)
      .then((res) => {
        console.log(res);
        if (!res.data.errorMessage) {
          let { data } = res;
          data = { ...data, roleUser: values?.roleUser };
          dispatch(storeUserId(data));
          localStorage.setItem("currentUser", JSON.stringify(data));
          if (dataReq.roleUser === SHOP) {
            history.replace("/shop");
          } else {
            let cart = {
              customerId: data.customerId,
              shopId: SHOP_ID,
            };
            setCart(cart);
            history.replace("/");
          }
          notification["success"]({
            message: "Login successfully",
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
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
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
          label="Phone Number"
          name="phoneNumber"
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
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Link to="/register">Register</Link>
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
