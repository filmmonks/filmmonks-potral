import { Form, Upload } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const MonksForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  return (
    <Form name="monks-form" onFinish={onFinish}>
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
    </Form>
  );
};

export default MonksForm;
