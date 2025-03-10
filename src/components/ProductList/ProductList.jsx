import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import AddProductButton from "../AddProductButton/AddProductButton";
import ProductPicker from "../productPicker/ProductPicker";
import ProductRow from "../ProductRow/ProductInputField";
import "./productList.css";

const MAX_PRODUCTS = 4;

const ProductList = () => {
  const [products, setProducts] = useState([
    { id: String(Date.now()), title: "" },
  ]);

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  // Ensure we are using sensors properly
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 }, // Prevent accidental drags
    })
  );

  const addProduct = () => {
    if (products.length < MAX_PRODUCTS) {
      setProducts((prev) => [...prev, { id: String(Date.now()), title: "" }]);
    }
  };

  const removeProduct = (id) => {
    setProducts((prevProducts) => prevProducts.filter((p) => p.id !== id));
  };

  const openProductPicker = (index) => {
    setSelectedProductIndex(index);
    setModalVisible(true);
  };

  const handleProductSelect = (selectedTitle) => {
    if (selectedProductIndex !== null) {
      setProducts((prevProducts) =>
        prevProducts.map((p, i) =>
          i === selectedProductIndex ? { ...p, title: selectedTitle } : p
        )
      );
      setSelectedProductIndex(null);
      setModalVisible(false);
    }
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    setProducts((prevProducts) => {
      const oldIndex = prevProducts.findIndex((p) => p.id === active.id);
      const newIndex = prevProducts.findIndex((p) => p.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        return arrayMove(prevProducts, oldIndex, newIndex);
      }

      return prevProducts;
    });
  };

  return (
    <div className="product-list-container">
      <div className="product-list-header">
        <h3>Product</h3>
        <h3>Discount</h3>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={products.map((p) => p.id)}
          strategy={verticalListSortingStrategy}
        >
          {products.map((product, index) => (
            <ProductRow
              key={product.id}
              product={product}
              setModalVisible={setModalVisible}
              index={index}
              onRemove={removeProduct}
              onInputClick={() => openProductPicker(index)}
            />
          ))}
        </SortableContext>
      </DndContext>

      {products.length < MAX_PRODUCTS && (
        <div className="add-product-container">
          <AddProductButton addProductRow={addProduct} />
        </div>
      )}

      <ProductPicker
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        onProductSelect={handleProductSelect}
      />
    </div>
  );
};

export default ProductList;
