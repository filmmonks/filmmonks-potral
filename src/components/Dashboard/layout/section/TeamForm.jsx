import { Form, Input, Button } from "antd";
import { useState } from "react";

import { toast } from "react-toastify";

const TeamForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  console.log(selectedFile);
  const onFinish = async (values) => {
    const formData = new FormData();
    formData.append("image", selectedFile);
    formData.append("title", values.designation);
    formData.append("email", values.email);
    formData.append("fb_link", values.fb);
    formData.append("linkedin", values.linkedin);
    formData.append("name", values.name);

    try {
      const response = await fetch("http://localhost:5000/api/teams", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error adding team member");
      }

      const data = await response.json();
      console.log(data);
      toast("Team member added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  return (
    <Form name="team-form" onFinish={onFinish}>
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item name="designation" label="Designation">
        <Input />
      </Form.Item>
      <Form.Item name="email" label="Email">
        <Input />
      </Form.Item>
      <Form.Item name="fb" label="Facebook">
        <Input />
      </Form.Item>
      <Form.Item name="linkedin" label="LinkedIn">
        <Input />
      </Form.Item>

      <Form.Item>
        <label> Image</label>
        <input
          style={{
            display: "inline-block",
            marginBlock: "20px",
            marginLeft: "20px",
          }}
          type="file"
          name="image"
          onChange={handleFileChange}
        />
        <Button
          style={{ display: "block", margin: "auto" }}
          type="primary"
          htmlType="submit"
        >
          Add Team Member
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeamForm;
