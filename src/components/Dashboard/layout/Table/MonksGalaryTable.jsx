import { toast } from "react-toastify";
import useFetch from "../../../../hooks/useFetch";
import { Button, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
const MonksGalaryTable = () => {
  const apiUrl = "http://localhost:5000/api/monks-galary"; // Replace with your API URL
  const { dataSource, loading, error } = useFetch(apiUrl);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }
  const handleDelete = (key) => {
    const url = `http://localhost:5000/api/monks-galary/${key}`;

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
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (image) => (
        <img
          src={`http://localhost:5000/monks/` + image}
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
      <Table dataSource={dataSource} columns={columns} scroll={{ x: 800 }} />
    </div>
  );
};

export default MonksGalaryTable;
