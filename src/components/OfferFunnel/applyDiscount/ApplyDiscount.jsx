import React from "react";
import { Checkbox, Tooltip, Typography } from "antd";
import { QuestionCircleOutlined } from "@ant-design/icons";
import "./applyDiscount.css";

const { Text } = Typography;

const ApplyDiscount = ({ checked, onChange }) => {
  return (
    <div className="apply-discount">
      <Checkbox checked={checked} onChange={onChange} className="checkbox">
        <Text className="title">
          Apply discount on compare price!.{" "}
          <Tooltip title="Discount will be applied on compare price of the product.">
            <QuestionCircleOutlined className="info-icon" />
          </Tooltip>
        </Text>
      </Checkbox>
      <Text className="description">
        Discount will be applied on compare price of the product. Discount set
        to inside the upsell offer should be more than or to equal to the
        discount set on a product in your store.
      </Text>
    </div>
  );
};

export default ApplyDiscount;
