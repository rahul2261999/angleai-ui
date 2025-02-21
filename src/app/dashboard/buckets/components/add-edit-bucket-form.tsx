"use client";

import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik, FormikProps } from "formik";
import { RefObject } from "react";
import styled from "styled-components";

const InputField = styled.input`
  width: 100%;
  height: 48px;

  padding: 0.5rem;

  border-radius: var(--border-radius);

  background: var(--bg-color-element-primary);
  color: var(--text-color-dark-primary);
  font-weight: 500;
  border: 0;

  &:focus {
    outline-color: var(--bg-color-solid-secondary);
  }
`;

const ValidationErrorMessage = styled(ErrorMessage)`
  color: var(--color-danger);
  font-size: 12px;
  font-weight: 500;
  margin-top: 0.5rem;
`;


const formValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters"),
});

export type AddEditBucketFormInitValues = Yup.InferType<
  typeof formValidationSchema
>;

export interface IAddEditBucketForm {
  formRef: RefObject<FormikProps<AddEditBucketFormInitValues> | null>;
  formState: AddEditBucketFormInitValues;
  onSubmit: (values: AddEditBucketFormInitValues) => void;
}

const AddEditBucketForm: React.FC<IAddEditBucketForm> = (props) => {
  return (
    <Formik
      innerRef={props.formRef}
      initialValues={props.formState}
      validationSchema={formValidationSchema}
      onSubmit={props.onSubmit}
    >
      {({ values, handleChange, errors, touched }) => (
        <Form>
          <InputField
            placeholder="Bucket Name"
            name="name"
            type="text"
            value={values.name}
            onChange={handleChange}
          />
          {errors.name && touched.name && (
            <ValidationErrorMessage name="name" component="div" />
          )}
        </Form>
      )}
    </Formik>
  );
};

export default AddEditBucketForm;
