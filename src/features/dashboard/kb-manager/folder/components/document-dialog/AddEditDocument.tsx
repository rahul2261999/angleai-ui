import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import CustomDialog from '@/components/ui/dialog/CustomDialog';
import { useDropzone } from 'react-dropzone';
import Input from '@/components/ui/input/Input';
import { FileUploadArea, FileIcon, FileText, FileName, InputGroup } from './styles';

interface IAddEditDocument {
  open: boolean;
  mode: 'add' | 'edit' | 'view';
  initialData?: {
    file?: File;
    tag?: string;
  };
  onClose: () => void;
  onSubmit: (data: { file: File; tag: string }) => void;
}

// Schema for form validation
const documentSchema = z.object({
  tag: z.string().min(1, 'Tag is required').max(100, 'Tag is too long'),
  file: z.instanceof(File, { message: 'File is required' }).optional(),
});

type DocumentFormData = z.infer<typeof documentSchema>;

const AddEditDocument: React.FC<IAddEditDocument> = ({
  open,
  mode,
  initialData,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm<DocumentFormData>({
    resolver: zodResolver(documentSchema),
    defaultValues: {
      tag: '',
      file: undefined,
    },
  });

  const file = watch('file');

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && mode !== 'edit') {
      setValue('file', acceptedFiles[0], { shouldValidate: true });
    }
  }, [mode, setValue]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    disabled: mode === 'view' || mode === 'edit',
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    multiple: false,
  });

  const handleFormSubmit = (data: DocumentFormData) => {
    if (mode === 'edit') {
      // In edit mode, only submit if tag has changed
      if (data.tag !== initialData?.tag && initialData?.file) {
        onSubmit({ file: initialData.file, tag: data.tag });
      }
    } else if (data.file) {
      onSubmit({ file: data.file, tag: data.tag });
    }
  };

  const handleClose = () => {
    reset({
      tag: '',
      file: undefined,
    });
    onClose();
  };

  // Reset form when dialog opens/closes or mode/initialData changes
  React.useEffect(() => {
    if (open) {
      // If dialog is opening
      if (mode === 'edit' && initialData) {
        reset({
          tag: initialData.tag || '',
          file: initialData.file,
        });
      } else {
        // For add mode, reset to empty
        reset({
          tag: '',
          file: undefined,
        });
      }
    }
  }, [open, mode, initialData, reset]);

  // Cleanup effect when dialog closes
  React.useEffect(() => {
    if (!open) {
      reset({
        tag: '',
        file: undefined,
      });
    }
  }, [open, reset]);

  const dialogButtons = [
    {
      text: 'Cancel',
      onClick: handleClose,
      backgroundColor: 'var(--gray-5)',
      color: 'var(--gray-12)',
    },
    ...(mode !== 'view'
      ? [
          {
            text: mode === 'add' ? 'Add' : 'Save',
            onClick: handleSubmit(handleFormSubmit),
            backgroundColor: 'var(--blue-9)',
            backgroundColorHover: 'var(--blue-10)',
            backgroundColorActive: 'var(--blue-11)',
            color: 'white',
            disabled: mode === 'edit' 
              ? watch('tag') === initialData?.tag // Disable if tag hasn't changed in edit mode
              : !file || !watch('tag'), // Disable if no file or tag in add mode
          },
        ]
      : []),
  ];

  return (
    <CustomDialog
      open={open}
      title={`${mode.charAt(0).toUpperCase() + mode.slice(1)} Document`}
      close={handleClose}
      buttons={dialogButtons}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FileUploadArea 
          {...getRootProps()} 
          $isDragActive={isDragActive} 
          $disabled={mode === 'edit' || mode === 'view'}
        >
          <input {...getInputProps()} />
          <FileIcon>📄</FileIcon>
          {file ? (
            <FileName>{file.name}</FileName>
          ) : (
            <FileText>
              {mode === 'view' || mode === 'edit'
                ? 'File upload disabled in this mode'
                : 'Drag and drop a file here, or click to select a file'}
            </FileText>
          )}
          {errors.file && <FileText style={{ color: 'var(--red-9)' }}>{errors.file.message}</FileText>}
        </FileUploadArea>

        <InputGroup>
          <Input
            id="tag"
            label="Tag"
            error={errors.tag?.message}
            {...register('tag')}
            placeholder="Enter a tag for the document"
            disabled={mode === 'view'}
          />
        </InputGroup>
      </form>
    </CustomDialog>
  );
};

export default AddEditDocument; 