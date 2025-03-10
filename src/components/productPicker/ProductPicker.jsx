import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  List,
  Checkbox,
  Spin,
  Empty,
  Typography,
  Button,
} from "antd";
import "./productPicker.css";
import { useDispatch } from "react-redux";
import { selectedProduct } from "../../store/slices/productSlice";
const { Search } = Input;

const ProductPicker = ({ setModalVisible, modalVisible, onProductSelect }) => {
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchProducts = async (search = "", page = 1, limit = 10) => {
    setLoading(true);
    setProducts([]);

    const url = `https://stageapi.monkcommerce.app/task/products/search?search=${search}&page=${page}&limit=${limit}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "x-api-key": "72njgfa948d9aS7gs5",
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();

      setProducts(data || []);
    } catch (error) {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    if (modalVisible) {
      fetchProducts(debouncedSearch);
    }
  }, [modalVisible, debouncedSearch]);

  return (
    <Modal
      bodyStyle={{ height: "400px", overflow: "scroll", overflowX: "hidden" }}
      title="Select Product"
      open={modalVisible}
      onCancel={() => setModalVisible(false)}
      centered
      footer={[
        <div
          key="footer"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Typography.Text>
            {selectedProducts.length} product
            {selectedProducts.length !== 1 ? "s" : ""} selected
          </Typography.Text>

          <div>
            <Button onClick={() => setModalVisible(false)}>Cancel</Button>
            <Button
              type="primary"
              style={{
                backgroundColor: "#007C5A",
                borderColor: "#007C5A",
                marginLeft: 8,
              }}
              onClick={async () => {
                await dispatch(selectedProduct(selectedProducts));
                setModalVisible(false);
                await onProductSelect(selectedProducts);
              }}
            >
              Add
            </Button>
          </div>
        </div>,
      ]}
    >
      <Search
        placeholder="Search product"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        allowClear
        style={{ marginBottom: 10 }}
      />

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>
          <Spin size="large" />
        </div>
      ) : products.length === 0 ? (
        <Empty description="No products found" />
      ) : (
        <List
          dataSource={products}
          renderItem={(product) => {
            const isParentSelected = selectedProducts.some(
              (p) => p.id === product.id
            );

            return (
              <div key={product.id} style={{ marginBottom: "10px" }}>
                <Checkbox
                  checked={isParentSelected}
                  onChange={() => {
                    setSelectedProducts((prevSelected) => {
                      if (isParentSelected) {
                        return prevSelected.filter((p) => p.id !== product.id); // Remove parent if unchecked
                      } else {
                        return [...prevSelected, product]; // Add parent if checked
                      }
                    });
                  }}
                >
                  <strong>{product.title}</strong>
                </Checkbox>

                <List
                  dataSource={product.variants}
                  renderItem={(variant) => (
                    <List.Item key={variant.id}>
                      <div className="variant-grid">
                        <Checkbox
                          checked={isParentSelected}
                          onChange={(e) => {
                            const checked = e.target.checked;

                            setSelectedProducts((prevSelected) => {
                              if (checked) {
                                if (!isParentSelected) {
                                  return [...prevSelected, product];
                                }
                              } else {
                                return prevSelected.filter(
                                  (p) => p.id !== product.id
                                );
                              }
                              return prevSelected;
                            });
                          }}
                        />
                        <span>{variant.title}</span>
                        <span>
                          {variant?.inventory_quantity || 1} available
                        </span>
                        <span>${variant.price}</span>
                      </div>
                    </List.Item>
                  )}
                />
              </div>
            );
          }}
        />
      )}
    </Modal>
  );
};

export default ProductPicker;
