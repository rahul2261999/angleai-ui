import CustomDialog from "@/components/CustomDialog";
import AddEditBucketForm, { IAddEditBucketForm } from "./add-edit-bucket-form";
import { IButton } from "@/components/button";
import { useRef } from "react";
import { FormikProps } from "formik";

interface IAddEditBucket {
  edit: boolean;
  open: boolean;
  closeDialog: () => void;
  bucket: IAddEditBucketForm["formState"];
  onSave: (values: IAddEditBucketForm["formState"]) => Promise<void>;
}

const AddEditBucket: React.FC<IAddEditBucket> = (props) => {
  const formikFormRef =
    useRef<FormikProps<IAddEditBucketForm["formState"]>>(null);

  const saveBucketHandler = async (values: IAddEditBucketForm["formState"]) => {
    await props.onSave(values);
    formikFormRef.current?.resetForm();
  };

  const dialogButtons: IButton[] = [
    {
      text: "Save",
      onClick: () => formikFormRef.current?.submitForm(),
      width: "80px",
    },
    {
      text: "Close",
      onClick: props.closeDialog,
      backgroundColor: "var(--bg-color-element-primary)",
      backgroundColorHover: "var(--bg-color-element-hover-primary)",
      color: "var(--text-color-light-primary)",
      width: "80px",
    },
  ];

  return (
    <CustomDialog
      title={props.edit ? "Rename Bucket" : "Create Bucket"}
      open={props.open}
      close={props.closeDialog}
      buttons={dialogButtons}
    >
      <AddEditBucketForm
        formRef={formikFormRef}
        key="bucket-add-edit"
        onSubmit={(values) => saveBucketHandler(values)}
        formState={{ name: props.bucket.name }}
      />
    </CustomDialog>
  );
};

export default AddEditBucket;
