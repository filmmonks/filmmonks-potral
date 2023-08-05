import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const AboutForm = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files);
  };

  const onFinish = async (values) => {
    console.log(values.description);

    if (selectedFiles.length > 0) {
      const formData = new FormData();
      formData.append("description", values.description);
      for (let i = 0; i < selectedFiles.length; i++) {
        formData.append("aboutfiles", selectedFiles[i]);
      }
      try {
        const response = await fetch("http://localhost:5000/api/about", {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          throw new Error("error adding the data");
        }

        const data = await response.json();
        console.log(data);
        toast("data is inserted successfully");
      } catch (error) {
        console.error(error);
        toast.error(error.message);
      }
    }
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <input type="file" name="about" onChange={handleFileChange} multiple />
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
};

export default AboutForm;
