import React from "react";
import { Button, Input } from "antd";
import { EditOutlined, MoreOutlined } from "@ant-design/icons";
import "./commonProductsRow.css";

const CommonProductRow = ({
  index,
  productName,
  onEdit,
  onDiscountClick,
  onShowVariants,
}) => {
  return (
    <div className="product-row">
      <div className="top-section">
        <MoreOutlined className="drag-icon" />
        <span className="index">{index}.</span>
        <div className="input-container">
          <Input value={productName} disabled />
          <EditOutlined className="edit-icon" onClick={onEdit} />
        </div>
        <Button className="discount-btn" onClick={onDiscountClick}>
          Add Discount
        </Button>
      </div>
      <div className="bottom-section">
        <span className="show-variants" onClick={onShowVariants}>
          Show Variants 
        </span>
      </div>
    </div>
  );
};

export default CommonProductRow;
