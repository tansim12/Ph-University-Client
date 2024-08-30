import { Form, Select } from "antd";
import { useEffect } from "react";
import { Controller, useFormContext, useWatch } from "react-hook-form";

type TPHSelectWithWatchProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  customStyle?: string;
  disabled?: boolean;
  mode?: "multiple" | undefined;
  changeOnValue: any;
};

const PHSelectWithWatch = ({
  label,
  name,
  options,
  customStyle,
  disabled,
  mode,
  changeOnValue,
}: TPHSelectWithWatchProps) => {
  const { control } = useFormContext();
  const inputValue = useWatch({
    control,
    name,
  });
console.log(inputValue);

  useEffect(() => {
    changeOnValue(inputValue);
  }, [ inputValue]);
  return (
    <div className={`${customStyle}`}>
      <Controller
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Form.Item label={label}>
            <Select
              mode={mode}
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

export default PHSelectWithWatch;
