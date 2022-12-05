import React from "react";
import { Grid, Skeleton } from "@mui/material";
import { baseMemo } from "@components/Formalite/elements/Bases/functions/memo";
import { FormikProps, FormikValues } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import { ComponentViewType } from "@components/Formalite/elements/ComponentView/ComponentView.type";
import { getData } from "@components/Formalite/config/utils";
import { ObjectSchema } from "yup";

type ComponentViewProps<T> = {
  allData: ComponentViewType;
  name: string;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
};

const ComponentView = <T extends FormikValues>(
  props: ComponentViewProps<T>
) => {
  const { allData, name, formik, loading } = props;

  const value = getData({ source: formik.values, key: name });
  const onChange = (newValue: any) => formik.setFieldValue(name, newValue);
  const error = getData({ source: formik.errors, key: name });
  const isTouched = getData({ source: formik.touched, key: name });

  if (loading) {
    return (
      <Grid item {...allData.layoutProps}>
        <Skeleton variant="rectangular" animation="wave" height={55} />
      </Grid>
    );
  }
  return (
    <Grid item {...allData.layoutProps}>
      {allData.render(name, value, onChange, error, isTouched)}
    </Grid>
  );
};
export default React.memo(ComponentView, (prevProps, nextProps) => {
  return baseMemo(prevProps, nextProps);
}) as typeof ComponentView;
