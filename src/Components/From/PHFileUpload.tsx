import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TFileUploadProps = {
  name: string;
  label?: string;
  type?: string;
};

const PHFileUpload = ({ name, label, type }: TFileUploadProps) => {
  return (
    <div style={{ marginBottom: "20px" }}>
      <Controller
        name={name}
        render={({
          field: { onChange, value, ...field },
          fieldState: { error },
        }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              value={value?.fileName}
              type={type}
              size="large"
              style={{ width: "100%" }}
              onChange={(e) => onChange(e.target?.files?.[0])}
            />
            {error && <small style={{ color: "red" }}>{error?.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHFileUpload;
