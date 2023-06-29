import { Table, Space, Button, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
const TeamTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((res) => res.json())
      .then((data) => setDataSource(data))
      .catch((err) => console.error(err));
  }, []);
  console.log(dataSource);
  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (imageUrl) => <img src={imageUrl} alt="Team Member" width={50} />,
    },
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Designation",
      dataIndex: "title",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Facebook",
      dataIndex: "fb_link",
    },
    {
      title: "LinkedIn",
      dataIndex: "linkedin",
    },

    {
      title: "Action",
      dataIndex: "action",
      render: (_, record) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            Edit
          </Button>
          <Button
            type="danger"
            icon={<DeleteOutlined />}
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        // Perform save/update logic using the values
        console.log("Form values:", values);
        setIsModalVisible(false);
      })
      .catch((error) => {
        console.log("Form validation error:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    // Handle delete button click for the corresponding record
    console.log("Delete button clicked for record with key:", key);
  };

  return (
    <>
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 800 }} />
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="title"
            label="Designation"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="email" label="Email" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="fb_link"
            label="Facebook"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="linkedin"
            label="LinkedIn"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TeamTable;
