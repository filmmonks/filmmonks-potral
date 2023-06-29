import { Form, Input, Button, Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

const AboutForm = () => {
  const onFinish = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.Item name="description" label="Description">
        <Input.TextArea rows={4} />
      </Form.Item>

      <Form.Item name="image" label="Image">
        <Upload>
          <Button icon={<UploadOutlined />}>Upload Image</Button>
        </Upload>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">Submit</Button>
      </Form.Item>
    </Form>
  );
};

export default AboutForm;
