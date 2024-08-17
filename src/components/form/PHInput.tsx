import { Form, Input } from "antd";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";

type TFieldType = "text" | "password";
type TPhInputProps = {
  name: string;
  label?: string;
  type: TFieldType;
  required?: boolean;
  placeholder: string;
};

const PHInput = ({ name, type, label, placeholder }: TPhInputProps) => {
  const fieldGenerator = (
    field: ControllerRenderProps<FieldValues, string>
  ) => {
    if (type === "password")
      return (
        <Input.Password
          {...field}
          type={type}
          id={name}
          size="large"
          placeholder={placeholder}
        />
      );
    return (
      <Input
        {...field}
        type={type}
        id={name}
        size="large"
        placeholder={placeholder}
      />
    );
  };
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <div style={{ position: "relative" }}>
          <Form.Item label={label ? label : name} name={name}>
            {fieldGenerator(field)}
          </Form.Item>
          {error && (
            <small
              style={{
                position: "absolute",
                left: "0.2rem",
                bottom: "-1.5rem",
                color: "red",
              }}
            >
              {error.message}
            </small>
          )}
        </div>
      )}
    />
  );
};

export default PHInput;
