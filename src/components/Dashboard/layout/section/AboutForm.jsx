import { Button, Form, Input } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const AboutForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
 
  const onFinish = async (values) => {
    console.log(values.description);
    const formData = new FormData();
    formData.append("about", selectedFile);
    formData.append("description", values.description);

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
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <input type="file" name="about" onChange={handleFileChange} />
      <Button type="primary" htmlType="submit">
        Add
      </Button>
    </Form>
  );
};

export default AboutForm;
