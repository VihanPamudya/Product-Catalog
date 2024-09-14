import React, { useEffect, useState } from "react";
import {
  Table,
  Button,
  Space,
  Popconfirm,
  message,
  Select,
  Row,
  Col,
} from "antd";
import { fetchProducts, deleteProduct } from "../services/api";
import ProductFormModal from "../Components/ProductFormModal";
import "../Styles/ProductListPage.css";

const { Option } = Select;

const ProductListPage = () => {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [productLine, setProductLine] = useState("ALL");

  const loadProducts = (page, size, productLine) => {
    setLoading(true);
    fetchProducts(page - 1, size, productLine)
      .then((res) => {
        setProducts(res.data.content);
        setPagination({
          current: page,
          pageSize: size,
          total: res.data.totalElements,
        });
      })
      .finally(() => setLoading(false));
  };

  const handleDelete = (id) => {
    deleteProduct(id)
      .then(() => {
        message.success("Product deleted successfully!");
        loadProducts(pagination.current, pagination.pageSize, productLine);
      })
      .catch(() => message.error("Failed to delete product!"));
  };

  const handleEdit = (record) => {
    setEditingProduct(record);
    setIsModalVisible(true);
  };

  const handleCreate = () => {
    setEditingProduct(null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    loadProducts(pagination.current, pagination.pageSize, productLine);
  };

  const handleTableChange = (pagination) => {
    loadProducts(pagination.current, pagination.pageSize, productLine);
  };

  useEffect(() => {
    loadProducts(pagination.current, pagination.pageSize, productLine);
  }, [productLine]);

  const columns = [
    { title: "Name", dataIndex: "productName", key: "productName" },
    {
      title: "Description",
      dataIndex: "productDescription",
      key: "productDescription",
    },
    { title: "Price", dataIndex: "productPrice", key: "productPrice" },
    { title: "Product Line", dataIndex: "productLine", key: "productLine" },

    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)} type="primary">
            Edit
          </Button>
          <Popconfirm
            title="Are you sure to delete this product?"
            onConfirm={() => handleDelete(record.productId)}
            okText="Yes"
            cancelText="No"
          >
            <Button
              style={{ backgroundColor: "red", color: "white" }}
              type="danger"
            >
              Delete
            </Button>{" "}
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className="page-container">
      <Row justify="center">
        <Col xs={24} sm={24} md={24} lg={20} xl={18} xxl={16}>
          <div className="product-table-wrapper">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 16,
              }}
            >
              <Button type="primary" onClick={handleCreate}>
                Create Product
              </Button>
              <Select
                value={productLine}
                onChange={(value) => setProductLine(value)}
                style={{ width: 200 }}
              >
                <Option value="ALL">All</Option>
                <Option value="ROAD">Road</Option>
                <Option value="MOUNTAIN">Mountain</Option>
                <Option value="TOURING">Touring</Option>
                <Option value="STANDARD">Standard</Option>
                <Option value="UNKNOWN">Unknown</Option>
              </Select>
            </div>

            <Table
              columns={columns}
              dataSource={products}
              pagination={{
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showSizeChanger: true,
                pageSizeOptions: ["5", "10", "15"],
              }}
              loading={loading}
              onChange={handleTableChange}
              rowKey="productId"
            />

            <ProductFormModal
              visible={isModalVisible}
              onClose={handleModalClose}
              product={editingProduct}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ProductListPage;
