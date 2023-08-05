import { Table, Space, Button, Modal, Form, Input } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const TeamTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [setSelectedRecord] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/teams")
      .then((res) => res.json())
      .then((data) => setDataSource(data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => {
        if (image) {
          return (
            <img
              src={`http://localhost:5000/team/` + image}
              alt="Team Member"
              width={50}
            />
          );
        } else {
          return (
            <img
              src="https://t4.ftcdn.net/jpg/05/49/98/39/240_F_549983970_bRCkYfk0P6PP5fKbMhZMIb07mCJ6esXL.jpg"
              alt="Default"
              width={50}
            />
          );
        }
      },
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
            onClick={() => handleDelete(record._id)}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const handleEdit = (record) => {
    console.log(record);
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const handleSave = () => {
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        // Extract the email from the form values
        const { email, ...data } = values;

        // Perform save/update logic using the values
        fetch(`http://localhost:5000/api/teams/${email}`, {
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
            console.log("Resource updated successfully");
            setIsModalVisible(false);
          })
          .catch((error) => {
            // Handle error
            console.error("Error updating resource:", error);
          });
      })
      .catch((error) => {
        console.log("Form validation error:", error);
      });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const handleDelete = (key) => {
    const url = `http://localhost:5000/api/teams/${key}`;

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
        toast("member is deleted");
      })
      .catch((error) => {
        // Handle error
        console.error("Error deleting resource:", error);
      });

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
