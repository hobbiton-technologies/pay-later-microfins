import React from "react";
import { InboxOutlined } from "@ant-design/icons";
import type { UploadProps, UploadFile } from "antd";
import { Upload } from "antd";

const { Dragger } = Upload;

interface DocumentUploadComponentProps {
  onUpload: (files: UploadFile[]) => void;
}

const DocumentUploadComponent: React.FC<DocumentUploadComponentProps> = ({
  onUpload,
}) => {
  const props: UploadProps = {
    name: "file",
    multiple: false,
    beforeUpload: (_, fileList) => {
      onUpload(fileList);
      return false;
    },

    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}>
      <p className="ant-upload-drag-icon">
        <InboxOutlined />
      </p>
      <p className="ant-upload-text">
        Click or drag file to this area to upload
      </p>
      <p className="ant-upload-hint">
        Support for a single or bulk upload. Strictly prohibited from uploading
        company data or other banned files.
      </p>
    </Dragger>
  );
};

export default DocumentUploadComponent;
