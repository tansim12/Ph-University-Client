import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  customStyle?: string;
  disabled?: boolean;
};

const PHSelect = ({
  label,
  name,
  options,
  customStyle,
  disabled,
}: TPHSelectProps) => {
  return (
    <div className={`${customStyle}`}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              style={{ width: "100%" }}
              {...field}
              options={options}
              size="large"
              disabled={disabled}
            />
            {error && <small style={{ color: "red" }}>{error.message}</small>}
          </Form.Item>
        )}
      />
    </div>
  );
};

export default PHSelect;
