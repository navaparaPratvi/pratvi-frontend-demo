import React from "react";
import { Typography } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import "./BundleProductsInfo.css"; 

const { Text } = Typography;

const BundleProductsInfo = () => {
  return (
    <div className="bundle-products-info">
      <Text className="title">Add Bundle Products (Max. 4 Products)</Text>
      <div className="info">
        <ExclamationCircleOutlined className="icon" />
        <Text className="description">
          Offer Bundle will be shown to the customer whenever any of the bundle
          products are added to the cart.
        </Text>
      </div>
      <Text className="error-message">Please select the offered product</Text>
    </div>
  );
};

export default BundleProductsInfo;
