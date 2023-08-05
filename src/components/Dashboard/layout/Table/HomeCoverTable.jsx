import { Button, Space, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import useFetch from "../../../../hooks/useFetch";
import { toast } from "react-toastify";

const HomeCoverTable = () => {
  const apiUrl = "https://filmmonks-server.onrender.com/upload"; // Replace with your API URL
  const { dataSource } = useFetch(apiUrl);
  console.log(dataSource);
  const handleDelete = (key) => {
    const url = `https://filmmonks-server.onrender.com/upload/${key}`;

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
      dataIndex: "path",
      key: "image",
      render: (images) => (
        <>
          {images.map((image) => (
            <img
              key={image.id}
              src={`https://filmmonks-server.onrender.com/home/` + image?.pathname}
              alt="Image"
              style={{ width: "100px", marginRight: "5px" }}
            />
          ))}
        </>
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

export default HomeCoverTable;
