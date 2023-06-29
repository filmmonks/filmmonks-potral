import { Form, Upload } from "antd";
// import { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
const Home = () => {
//   const [selectedFile, setSelectedFile] = useState(null);

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     setSelectedFile(file);
//   };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Perform upload logic here using the selectedFile

    // Reset the form
    // setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit" disabled={!selectedFile}>
        Upload
      </button> */}
      <Form.Item label="Upload" valuePropName="fileList">
        <Upload action="/upload.do" listType="picture-card">
          <div>
            <PlusOutlined />
            <div
              style={{
                marginTop: 8,
              }}
            >
              Upload
            </div>
          </div>
        </Upload>
      </Form.Item>
    </form>
  );
};

export default Home;
