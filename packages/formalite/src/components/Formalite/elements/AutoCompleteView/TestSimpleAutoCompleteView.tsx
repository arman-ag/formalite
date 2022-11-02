import React, { useMemo } from "react";
import * as Yup from "yup";

import { Language } from "@components/base/model";
import { Formalite, MainType, ViewTypes } from "@components/Formalite";
import { useFormaliteRef } from "@components/Formalite/config/useFormaliteRef";
import type { AutoCompleteViewType } from "./AutoCompleteView.type";

const validation = Yup.object({
  title: Yup.string().required(),
}).required();
type ValidationType = Yup.InferType<typeof validation>;

const iniValues: ValidationType = {
  title: "",
};

type TestSimpleAutoCompleteViewProps = Omit<AutoCompleteViewType, "type"> & {
  lang?: Language;
  // mode?: "complex " | "freesolo" | "multiple" | "simple"
};

export const TestSimpleAutoCompleteView = ({
  lang = "en",
  ...props
}: TestSimpleAutoCompleteViewProps) => {
  const formRef = useFormaliteRef<ValidationType>();

  const formString: MainType = useMemo(() => {
    return {
      title: {
        type: ViewTypes.AutoCompleteView,
        ...props,
      },
    };
  }, [props]);

  return (
    <Formalite<ValidationType>
      lang={lang}
      formString={formString}
      initialValues={iniValues}
      validationSchema={validation}
      formRef={formRef}
      onSubmit={(values) => {
        console.log(values);
      }}
    />
  );
};
