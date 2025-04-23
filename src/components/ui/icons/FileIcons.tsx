'use client';

import React from 'react';
import { FileText, FileType, File } from 'lucide-react';

interface FileIconProps {
  type: string;
  size?: number;
}

const FileIcon: React.FC<FileIconProps> = ({ type, size = 24 }) => {
  switch (type.toLowerCase()) {
    case 'pdf':
      return (
        <FileType
          size={size}
          style={{
            color: 'var(--red-9)',
          }}
        />
      );
    case 'doc':
    case 'docx':
      return (
        <FileText
          size={size}
          style={{
            color: 'var(--blue-9)',
          }}
        />
      );
    case 'txt':
      return (
        <FileText
          size={size}
          style={{
            color: 'var(--gray-9)',
          }}
        />
      );
    default:
      return (
        <File
          size={size}
          style={{
            color: 'var(--gray-9)',
          }}
        />
      );
  }
};

export default FileIcon; 