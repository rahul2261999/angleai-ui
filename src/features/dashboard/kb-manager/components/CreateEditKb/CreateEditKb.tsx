"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import styled from "styled-components";
import CustomDialog from "@/components/ui/dialog/CustomDialog";
import { useEffect } from "react";

// Schema for form validation
const kbSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name is too long"),
});

type KbFormData = z.infer<typeof kbSchema>;

interface CreateEditKbProps {
  mode: "create" | "edit" | "view";
  initialData?: KbFormData;
  open: boolean;
  onClose: () => void;
  onSubmit: (data: KbFormData) => void;
}

// Styled components
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
`;

const Label = styled.label`
  font-size: 0.875rem;
  font-weight: 500;
  color: var(--text-color-dark-primary);
`;

const Input = styled.input`
  width: 100%;
  height: 40px;
  padding: 0.5rem 1rem;
  border: 1px solid var(--gray-5);
  border-radius: 8px;
  font-size: 0.875rem;
  color: var(--gray-12);
  background-color: var(--gray-2);
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: var(--blue-9);
    background-color: var(--contrast-primary);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }

  &::placeholder {
    color: var(--gray-7);
  }
`;

const ErrorMessage = styled.span`
  color: var(--red-9);
  font-size: 0.75rem;
`;

const DIALOG_TITLES = {
  create: "Create Knowledge Base",
  edit: "Edit Knowledge Base",
  view: "View Knowledge Base",
} as const;

export const CreateEditKb: React.FC<CreateEditKbProps> = ({
  mode,
  initialData,
  open,
  onClose,
  onSubmit,
}) => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<KbFormData>({
    resolver: zodResolver(kbSchema),
    defaultValues: { name: '' },
  });

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFormSubmit = (data: KbFormData) => {
    onSubmit(data);
    handleClose();
  };

  useEffect(() => {
    if (open && initialData) {
      reset(initialData);
    }
  }, [open, initialData, reset]);

  const isViewMode = mode === "view";
  const buttons = [
    {
      text: "Cancel",
      onClick: handleClose,
      backgroundColor: "var(--gray-5)",
      color: "var(--gray-12)",
    },
    ...(isViewMode
      ? []
      : [
          {
            text: mode === "create" ? "Create" : "Save",
            onClick: handleSubmit(handleFormSubmit),
            backgroundColor: "var(--blue-9)",
          },
        ]),
  ];

  return (
    <CustomDialog 
      title={DIALOG_TITLES[mode]} 
      open={open} 
      close={handleClose} 
      buttons={buttons}
    >
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            type="text"
            placeholder="Enter knowledge base name"
            disabled={isViewMode}
            {...register("name")}
          />
          {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}
        </FormGroup>
      </form>
    </CustomDialog>
  );
};