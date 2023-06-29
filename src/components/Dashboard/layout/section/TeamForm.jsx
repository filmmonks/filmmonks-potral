import { Form, Input, Button } from "antd";
// import { PlusOutlined } from "@ant-design/icons";

const TeamForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    const teamData = {
      // image: values.upload[0].originFileObj, // Assuming you are using Ant Design Upload component correctly
      designation: values.designation,
      email: values.email,
      fb_link: values.fb,
      linkedin: values.linkedin,
      name: values.name,
    };

    fetch("http://localhost:5000/api/teams", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(teamData),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <Form name="team-form" onFinish={onFinish}>
      {/* <Form.Item label="Upload" valuePropName="fileList">
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
      </Form.Item> */}
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
      <Form.Item name="name" label="Name">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Team Member
        </Button>
      </Form.Item>
    </Form>
  );
};

export default TeamForm;
