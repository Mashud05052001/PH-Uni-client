// import { Form, Select } from "antd";
// import { Controller } from "react-hook-form";

// type TPhSelectProps = {
//   name: string;
//   placeholder: string;
//   label?: string;
//   options: Record<string, unknown>[];
// };

// const PHSelect = ({ name, label, placeholder, options }: TPhSelectProps) => {
//   return (
//     <Controller
//       name={name}
//       render={({ field, fieldState: { error } }) => (
//         // <Form.Item label={label ? label : name} name={name}>
//         <Form.Item label={label}>
//           <Select
//             {...field}
//             style={{ width: "100%" }}
//             size="large"
//             placeholder={placeholder}
//             // optionFilterProp="label"
//             options={options}
//           />
//           {error && (
//             <small
//               style={{
//                 position: "absolute",
//                 left: "0.2rem",
//                 bottom: "-1.1rem",
//                 color: "red",
//               }}
//             >
//               {error.message}
//             </small>
//           )}
//         </Form.Item>
//       )}
//     />
//   );
// };

// export default PHSelect;

import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TPHSelectProps = {
  label: string;
  name: string;
  options: { value: string; label: string; disabled?: boolean }[] | undefined;
  // options: Record<string, unknown>[];
  disabled?: boolean;
  mode?: "multiple" | undefined;
  placeholder?: string;
};

const PHSelect = ({
  label,
  name,
  placeholder,
  options,
  disabled,
  mode,
}: TPHSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            mode={mode}
            // placeholder={placeholder}
            style={{ width: "100%" }}
            {...field}
            options={options}
            size="large"
            // disabled={disabled}
          />
          {error && <small style={{ color: "red" }}>{error.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default PHSelect;
