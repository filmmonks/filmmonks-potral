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
      const response = await fetch("https://filmmonks-server.onrender.com/api/teams", {
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
        <b>
          <small style={{ color: "red", display: "block" }}>
            {" "}
            Please add image 384px × 384 px circle with no background
          </small>
        </b>
        {/* <img
          style={{ border: "1px solid black" }}
          src="https://filmmonks-server.onrender.com/team/1689421020413-1.png"
          alt="team"
        /> */}
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
