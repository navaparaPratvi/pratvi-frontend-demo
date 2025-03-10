import React, { useState } from "react";
import { Button, Input, Select, Typography } from "antd";
import {
  EditOutlined,
  HolderOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

const { Option } = Select;
const { Text } = Typography;

const ProductRow = ({
  product,
  index,
  onRemove,
  setModalVisible,
  onInputClick,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: product.id });

  const [showVariants, setShowVariants] = useState(false);
  const [discount, setDiscount] = useState("");
  const [discountType, setDiscountType] = useState("% Off");
  const [showDiscount, setShowDiscount] = useState(false);
  const [variantDiscounts, setVariantDiscounts] = useState({});

  const toggleVariantDiscount = (variantId) => {
    setVariantDiscounts((prev) => ({
      ...prev,
      [variantId]: !prev[variantId],
    }));
  };

  const updateVariantDiscount = (variantId, value) => {
    setVariantDiscounts((prev) => ({
      ...prev,
      [variantId]: { ...prev[variantId], value },
    }));
  };

  const updateVariantDiscountType = (variantId, value) => {
    setVariantDiscounts((prev) => ({
      ...prev,
      [variantId]: { ...prev[variantId], type: value },
    }));
  };

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "5px",
    padding: "8px 0",
  };

  return (
    <div ref={setNodeRef} style={{ width: "100%" }}>
      <div style={style}>
        <HolderOutlined
          {...attributes}
          {...listeners}
          style={{ cursor: "grab" }}
        />
        <span>{index + 1}.</span>
        <Input
          size="medium"
          placeholder="Select Product"
          readOnly
          value={product?.title?.[0]?.title || "Select Product"}
          suffix={
            <EditOutlined
              className="edit-icon"
              onClick={() => {
                onInputClick();
                setModalVisible(true);
              }}
            />
          }
        />
        {!showDiscount ? (
          <Button
            type="link"
            onClick={() => setShowDiscount(true)}
            style={{ color: "#fff", backgroundColor: "#0f5534" }}
          >
            Add Discount
          </Button>
        ) : (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Input
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
              placeholder="Discount"
              style={{ width: "80px", textAlign: "center" }}
            />

            <Select
              value={discountType}
              onChange={setDiscountType}
              style={{ width: "95px" }}
            >
              <Option value="% Off">% Off</Option>
              <Option value="Fixed Price">Flat off</Option>
            </Select>
          </div>
        )}

        {/* Remove Product */}
        <CloseCircleOutlined
          onClick={() => onRemove(product.id)}
          style={{ color: "#d3d3d3", cursor: "pointer", fontSize: "16px" }}
        />
      </div>
      <Text
        type="link"
        underline
        onClick={() => setShowVariants(!showVariants)}
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          fontSize: "12px",
          color: "blue",
        }}
      >
        {showVariants ? "Hide variants ▲" : "Show variants ▼"}
      </Text>

      {showVariants && (
        <div style={{ marginLeft: "30px", padding: "5px 0", color: "#555" }}>
          {product?.title?.[0]?.variants.map((variant) => (
            <div
              key={variant.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "5px",
              }}
            >
              <HolderOutlined style={{ cursor: "grab" }} />
              <Input
                value={variant.title}
                style={{ borderRadius: "20px", padding: "4px 10px" }}
              />
              {!variantDiscounts[variant.id] ? (
                <>
                  <Button
                    type="link"
                    onClick={() => toggleVariantDiscount(variant.id)}
                    style={{ color: "#fff", backgroundColor: "#0f5534" }}
                  >
                    Add Discount
                  </Button>
                  <CloseCircleOutlined
                    style={{
                      color: "#d3d3d3",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                </>
              ) : (
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Input
                    placeholder="Discount"
                    value={variantDiscounts[variant.id]?.value || ""}
                    onChange={(e) =>
                      updateVariantDiscount(variant.id, e.target.value)
                    }
                    style={{ width: "80px", textAlign: "center" }}
                  />

                  <Select
                    value={variantDiscounts[variant.id]?.type || "% Off"}
                    onChange={(value) =>
                      updateVariantDiscountType(variant.id, value)
                    }
                    style={{ width: "95px" }}
                  >
                    <Option value="% Off">% Off</Option>
                    <Option value="Fixed Price">Flat off</Option>
                  </Select>
                  <CloseCircleOutlined
                    style={{
                      color: "#d3d3d3",
                      cursor: "pointer",
                      fontSize: "16px",
                    }}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductRow;
