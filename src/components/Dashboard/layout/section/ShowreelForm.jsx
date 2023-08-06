import { Form, Input, Button } from "antd";
import { toast } from "react-toastify";

const ShowreelForm = () => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    // Handle form submission
    console.log(values);

    const linkData = {
      link: values.link,
    };

    fetch("https://filmmonks-server.onrender.com/api/showreels-link", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(linkData),
    })
      .then((res) => res.json())
      .then(() => {
        // console.log(data);
        toast("Link is added successfully"); // Display toast notification
      })
      .catch((err) => {
        console.error(err);
        toast.error("Error adding Link"); // Display error toast notification
      });
    form.resetFields();
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item
        label="Link"
        name="link"
        rules={[
          {
            type: "url",
            message: "Please enter a valid URL",
          },
        ]}
      >
        <Input placeholder="Enter link" />
      </Form.Item>
      <b>
        <small style={{ color: "red", display: "block" }}>
          {" "}
          Please add  youtube link in embeded form
        </small>
      </b>
      <Form.Item>
        <Button className="btn" type="primary" htmlType="submit">
          Add Link
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShowreelForm;
