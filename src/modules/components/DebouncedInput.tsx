import React, { ChangeEventHandler } from "react";
import { Input, Spin } from "antd";
import { debounce } from "lodash";
import { SearchOutlined } from "@ant-design/icons";

interface InputFieldProps {
  placeholder: string;
  onSearch: (value: string) => void;
  loading?: boolean;
  allowClear?: boolean;
  onClear: () => void;
}

const DebouncedInputField: React.FC<InputFieldProps> = ({
  placeholder,
  onClear,
  onSearch,
  loading,
  allowClear,
}) => {
  const debouncedOnChange: ChangeEventHandler<HTMLInputElement> = debounce(
    (e) => {
      onSearch(e.target.value);
    },
    1000
  );

  return (
    <Input
      className=""
      placeholder={placeholder}
      onChange={debouncedOnChange}
      suffix={
        loading ? (
          <Spin size="small" />
        ) : (
          <SearchOutlined className="text-green-700" />
        )
      }
      onClear={onClear}
      allowClear={allowClear}
    />
  );
};

export default DebouncedInputField;
