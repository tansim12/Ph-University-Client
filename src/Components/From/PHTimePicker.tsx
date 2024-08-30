import { Form, TimePicker } from "antd";
import { Controller } from "react-hook-form";

type TTimePickerProps = {
  name: string;
  label?: string;
};

const PHTimePicker = ({ name, label }: TTimePickerProps) => {
  const format = "HH:mm";
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <TimePicker
              {...field}
              size="large"
              style={{ width: "100%" }}
              type="time"
              format={format}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHTimePicker;
