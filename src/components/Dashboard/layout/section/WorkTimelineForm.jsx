import { Form, Input, Button } from "antd";

const WorkTimelineForm = () => {
  const onFinish = (values) => {
    console.log("Form values:", values);
    // Handle form submission logic here
  };

  return (
    <Form name="work-timeline-form" onFinish={onFinish}>
      <Form.Item name="image" label="Image">
        <Input />
      </Form.Item>
      <Form.Item name="headline" label="Headline">
        <Input />
      </Form.Item>
      <Form.Item name="content" label="Content">
        <Input.TextArea />
      </Form.Item>
      <Form.Item name="type" label="Type">
        <Input />
      </Form.Item>
      <Form.Item name="director" label="Director">
        <Input />
      </Form.Item>
      <Form.Item name="year" label="Year">
        <Input />
      </Form.Item>
      <Form.Item name="producer" label="Producer">
        <Input />
      </Form.Item>
      <Form.Item name="language" label="Language">
        <Input />
      </Form.Item>
      <Form.Item name="writer" label="Writer">
        <Input />
      </Form.Item>
      <Form.Item name="videoLink" label="Video Link">
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Add Work Timeline
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkTimelineForm;
