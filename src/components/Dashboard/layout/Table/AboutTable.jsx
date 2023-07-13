import { Button, Form, Input, Modal, Space, Table } from "antd";
import useFetch from "../../../../hooks/useFetch";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState } from "react";
import { toast } from "react-toastify";
const AboutTable = () => {
  const apiUrl = "http://localhost:5000/api/about"; // Replace with your API URL
  const { dataSource, loading, error } = useFetch(apiUrl);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  console.log(dataSource);
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const handleEdit = (record) => {
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const handleSave = () => {
    const _id = selectedRecord._id;
    form.validateFields().then((values) => {
      // Extract the email from the form values
      const { ...data } = values;

      // Perform save/update logic using the values
      fetch(`http://localhost:5000/api/about/${_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("HTTP status " + response.status);
          }
          // Handle success response
          toast("Resource updated successfully");
          console.log("Resource updated successfully");
          setIsModalVisible(false);
        })
        .catch((error) => {
          // Handle error
          toast("Error updating resource");
          console.error("Error updating resource:", error);
        });
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    const url = `http://localhost:5000/api/about/${key}`;

    fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("HTTP status " + response.status);
        }
        // Handle success response
        console.log("Resource deleted successfully");
        toast("Data is deleted");
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting resource:", error);
      });

    // Handle delete button click for the corresponding record
    console.log("Delete button clicked for record with key:", key);
  };
  const columns = [
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`http://localhost:5000/about/` + image}
          alt="Image"
          style={{ width: "100px" }}
        />
      ),
    },
    {
      title: "Actions",
      key: "actions",
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
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div>
      <h1>About</h1>
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 800 }} />
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          {/* <Form.Item name="image" label="Image" rules={[{ required: true }]}>
            <Input />
          </Form.Item> */}
          <Form.Item
            name="description"
            label="Description"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="image" label="Image" rules={[{ required: true }]}>
            <img
              style={{ width: "300px" }}
              src={`http://localhost:5000/about/1689224143138-IMG_20220724_142355.jpg`}
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AboutTable;
