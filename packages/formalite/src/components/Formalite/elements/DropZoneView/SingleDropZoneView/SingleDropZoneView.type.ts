import { DropzoneOptions } from "react-dropzone";
import { ReactNode } from "react";
import { BaseViewType, ViewTypes } from "@components/Formalite/Formalite.type";
import { FormikProps } from "formik";
import { OptionalObjectSchema } from "yup/lib/object";
import {
  CustomFile,
  ImageDownloaderPromise,
} from "@components/Formalite/elements/DropZoneView/Components/Global.type";
import { ObjectSchema } from "yup";

export interface SingleDropZoneViewType extends BaseViewType {
  type: ViewTypes.SingleDropZoneView;

  /**
   * Props that contain
   *
   * @prop onChange > Callback will call when input value change (array)
   *
   * @prop label > Label text for input
   *
   * @prop helperText > Text show below component (ReactNode)
   *
   * @prop dropZoneOptions > Specify props that passed to react-dropzone Dropzone component [react-dropzone Dropzone](https://react-dropzone.js.org/#src)
   * @see [SingleDropZoneView docs](https://formalite-docs.novin.dev/?path=/docs/components-dropzoneview--single-drop-zone-view)
   */
  inputProps: {
    /**
     * Callback will call when input value change (array)
     */
    onChange?: (value: string) => void;
    /*
     * Label text for input
     */
    label: ReactNode;

    /**
     * Specify props that passed to react-dropzone Dropzone component
     * @see [react-dropzone Dropzone](https://react-dropzone.js.org/#src)
     */
    dropZoneOptions?: Partial<DropzoneOptions>;
    /**
     * Text show below component (ReactNode)
     */
    helperText?: ReactNode;
  };

  /**
   * A callback function that runs when Upload occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param file > The chosen file
   * @param progress > A callback that gives progress number in arg
   * @param uploadController > uploadController to connect to axios for auto abort
   */
  onUpload: (
    file: CustomFile,
    progress: (progress: number) => void,
    uploadController: AbortController
  ) => Promise<string | undefined>;

  /**
   * A callback function that runs when Delete occurred in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param id > id of selected item to be deleted
   * @param isFromDefault > Tells you that this is a new item or it's from the default value
   * @param isSuccess > Tells you delete was Success
   */
  onDelete: (
    id: string,
    isFromDefault: boolean,
    isSuccess: boolean
  ) => Promise<void>;

  /**
   * A callback function that must run when an image want to be downloaded in MultiDropZoneView
   *
   * As an args of callback ,gives you :
   * @param pathUrl > The url of downloaded image
   * @param controller > A controller object that allows you to abort one or more DOM requests as and when desired.
   */
  imageDownloader?: (
    pathUrl: string,
    controller: AbortController
  ) => Promise<ImageDownloaderPromise>;
}

export type SingleDropZoneViewProps<T> = {
  allData: SingleDropZoneViewType;
  name: keyof T;
  formik: FormikProps<T>;
  loading: boolean;
  validationSchema: ObjectSchema<any>;
  translator: Function;
};
