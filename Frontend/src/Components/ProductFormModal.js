import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select, Button, message } from "antd";
import { createProduct, updateProduct } from "../services/api";

const { Option } = Select;

const ProductFormModal = ({ visible, onClose, product }) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
  }, [product, form]);

  const onFinish = (values) => {
    if (product) {
      updateProduct(product.productId, values)
        .then(() => {
          message.success("Product updated successfully!");
          form.resetFields();
          onClose();
        })
        .catch(() => message.error("Failed to update product!"));
    } else {
      createProduct(values)
        .then(() => {
          message.success("Product created successfully!");
          form.resetFields();
          onClose();
        })
        .catch(() => message.error("Failed to create product!"));
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onClose();
  };

  return (
    <Modal
      open={visible}
      title={product ? "Edit Product" : "Create Product"}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel}>
          Cancel
        </Button>,
        <Button key="submit" type="primary" onClick={() => form.submit()}>
          Save
        </Button>,
      ]}
    >
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item
          name="productName"
          label="Product Name"
          rules={[
            { required: true, message: "Please enter the product name!" },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="productDescription"
          label="Product Description"
          rules={[
            {
              required: true,
              message: "Please enter the product description!",
            },
          ]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item
          name="productPrice"
          label="Price"
          rules={[
            { required: true, message: "Please enter the product price!" },
          ]}
        >
          <InputNumber min={0} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          name="productLine"
          label="Product Line"
          rules={[{ required: true, message: "Please select a product line!" }]}
        >
          <Select>
            <Option value="ROAD">Road</Option>
            <Option value="MOUNTAIN">Mountain</Option>
            <Option value="TOURING">Touring</Option>
            <Option value="STANDARD">Standard</Option>
            <Option value="UNKNOWN">Unknown</Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductFormModal;
