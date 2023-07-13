import { Form, Input, Button } from "antd";
import { useState } from "react";
import { toast } from "react-toastify";

const WorkTimelineForm = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };



  console.log(selectedFile);
  const onFinish = async (values) => {

    console.log(values)
    const formData = new FormData();
    formData.append("timeline", selectedFile);
    formData.append("headline", values.headline);
    formData.append("content", values.content);
    formData.append("type", values.type);
    formData.append("director", values.director);
    formData.append("year", values.year);
    formData.append("producer", values.producer);
    formData.append("language", values.language);
    formData.append("writer", values.writer);
    formData.append("videoLink", values.videoLink);

    try {
      const response = await fetch("http://localhost:5000/api/work-timeline", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Error adding timeline");
      }

      const data = await response.json();
      console.log(data);
      toast("timeline added successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };
  return (
    <Form name="work-timeline-form" onFinish={onFinish}>
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
        <input type="file" name="timeline" onChange={handleFileChange} />
        <Button type="primary" htmlType="submit">
          Add Work Timeline
        </Button>
      </Form.Item>
    </Form>
  );
};

export default WorkTimelineForm;
