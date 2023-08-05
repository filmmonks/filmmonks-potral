import { Table, Button, Space, Form, Modal } from "antd";
import Input from "antd/es/input/Input";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const ShowreelTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);

  useEffect(() => {
    fetch("https://filmmonks-server.onrender.com/api/showreels-link")
      .then((res) => res.json())
      .then((data) => setDataSource(data))
      .catch((err) => console.error(err));
  }, []);

  const columns = [
    {
      title: "Link",
      dataIndex: "link",
      key: "link",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Space size="middle">
          <Button onClick={() => handleEdit(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record._id)}>Delete</Button>
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
        const { link, ...data } = values;

        // Perform save/update logic using the values

        fetch(`https://filmmonks-server.onrender.com/api/showreels-link/${link}`, {
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
    const url = `https://filmmonks-server.onrender.com/api/showreels-link/${key}`;

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
        toast("Link is deleted");
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
      <Table columns={columns} dataSource={dataSource} />
      <Modal
        title="Edit Record"
        visible={isModalVisible}
        onOk={handleSave}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                type: "url",
                message: "Please enter a valid URL",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ShowreelTable;
