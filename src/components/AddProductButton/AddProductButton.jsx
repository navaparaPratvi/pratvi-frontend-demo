import React from "react";
import { Button } from "antd";
import "./addproductBtn.css";

const AddProductButton = ({ addProductRow }) => {
  return (
    <Button className="add-product-btn" onClick={addProductRow}>
      Add Product
    </Button>
  );
};

export default AddProductButton;
