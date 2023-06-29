import { Form, Input, Button } from 'antd';

const ShowreelForm = () => {
  const onFinish = (values) => {
    // Handle form submission
    console.log(values);
  };

  return (
    <Form onFinish={onFinish}>
      <Form.List name="links">
        {(fields, { add, remove }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                label={index === 0 ? 'Links' : ''}
                required={false}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      type: 'url',
                      message: 'Please enter a valid URL',
                    },
                  ]}
                  noStyle
                >
                  <Input placeholder="Enter link" style={{ width: '90%' }} />
                </Form.Item>
                {fields.length > 1 && (
                  <Button danger onClick={() => remove(field.name)}>
                    Remove
                  </Button>
                )}
              </Form.Item>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block>
                Add Link
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ShowreelForm;
