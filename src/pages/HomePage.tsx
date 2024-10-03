import React, { useEffect, useState } from "react";
import { Modal, Form, Input, Button, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { MdDelete } from "react-icons/md";
import { FaRegEdit } from "react-icons/fa";
import { Product } from "domain/entities/Products";
import {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "services/product.service";

const HomePage: React.FC = () => {
  const itemsPerPage = 5;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [paginatedData, setPaginatedDate] = useState<Product[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const getProductsList = async () => {
    try {
      const response = await getProducts(currentPage, "");
      setPaginatedDate(response.results);
      setTotal(response.count);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    try {
      await deleteProduct(Number(id));
      getProductsList();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsList();
  }, [currentPage]);

  const columns: ColumnsType<Product> = [
    {
      title: "Nome do Produto",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text}</strong>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${Number(price).toFixed(2)}`,
    },
    {
      title: "Ação",
      key: "action",
      render: (_, record) => (
        <div>
          <Button onClick={() => openEditModal(record)}>
            <FaRegEdit />
          </Button>
          <Button onClick={() => handleDeleteProduct(record.id)}>
            <MdDelete />
          </Button>
        </div>
      ),
    },
  ];

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    form.setFieldsValue(product);
    setIsModalVisible(true);
  };

  const openCreateModal = () => {
    setEditingProduct(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await updateProduct(values, editingProduct.id);
      } else {
        await createProduct(values);
      }
      setIsModalVisible(false);

      await getProductsList();
    } catch (err) {
      return;
    }
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <Button type="primary" onClick={openCreateModal}>
        Adicionar Produto
      </Button>
      <Table
        columns={columns}
        dataSource={paginatedData}
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: total,
          onChange: handlePageChange,
        }}
        rowKey="name"
      />

      <Modal
        title={editingProduct ? "Editar Produto" : "Criar Produto"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Nome do Produto"
            name="name"
            rules={[
              { required: true, message: "Please input the product name!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Descição"
            name="description"
            rules={[
              {
                required: true,
                message: "Please input the product description!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Preço"
            name="price"
            rules={[
              { required: true, message: "Please input the product price!" },
            ]}
          >
            <Input type="number" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default HomePage;
