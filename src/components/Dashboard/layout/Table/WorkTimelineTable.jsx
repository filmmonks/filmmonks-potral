import { Table, Button, Space, Modal, Form, Input } from "antd";
import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { toast } from "react-toastify";
const WorkTimelineTable = () => {
  const [dataSource, setDataSource] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [selectedRecord, setSelectedRecord] = useState(null);
  useEffect(() => {
    fetch("http://localhost:5000/api/work-timeline")
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
              src={`http://localhost:5000/timeline/` + image}
              alt="timeline"
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
      title: "Headline",
      dataIndex: "headline",
      key: "headline",
    },

    {
      title: "Content",
      dataIndex: "content",
      key: "content",
    },
    {
      title: "Type",
      dataIndex: "type",

      key: "type",
    },
    {
      title: "Director",
      dataIndex: "director",

      key: "director",
    },
    {
      title: "Year",
      dataIndex: "year",

      key: "year",
    },
    {
      title: "Producer",
      dataIndex: "producer",

      key: "producer",
    },
    {
      title: "Language",
      dataIndex: "language",

      key: "language",
    },
    {
      title: "Writer",
      dataIndex: "writer",

      key: "writer",
    },
    {
      title: "Video Link",
      dataIndex: "videoLink",
      key: "videoLink",
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

  const handleEdit = (record) => {
    console.log(record);
    setSelectedRecord(record);
    form.setFieldsValue(record);
    setIsModalVisible(true);
  };
  const handleSave = () => {
    const _id = selectedRecord._id;
    form
      .validateFields()
      .then((values) => {
        console.log(values);
        // Extract the email from the form values
        const {  ...data } = values;

        // Perform save/update logic using the values
        fetch(`http://localhost:5000/api/work-timeline/${_id}`, {
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
            setIsModalVisible(false);
          })
          .catch((error) => {
            // Handle error
            toast("Error updating resource")
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
    const url = `http://localhost:5000/api/work-timeline/${key}`;

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
        toast("work timeline is deleted");
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
      <Table columns={columns} dataSource={dataSource} scroll={{ x: 800 }} />
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
            name="headline"
            label="Headline"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="content"
            label="Content"
            rules={[{ required: true }]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item name="type" label="Type" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="director"
            label="Director"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="year" label="Year" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="producer"
            label="Producer"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="language"
            label="Language"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item name="writer" label="Writer" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="videoLink"
            label="Video Link"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default WorkTimelineTable;
