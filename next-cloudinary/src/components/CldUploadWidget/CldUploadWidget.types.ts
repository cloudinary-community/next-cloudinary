import {
  CloudinaryUploadWidgetOptions,
  CloudinaryUploadWidgetResults,
  CloudinaryUploadWidgetInstanceMethods,
  CloudinaryUploadWidgetError
} from '@cloudinary-util/types';
import { ConfigOptions } from "@cloudinary-util/url-loader";

export type CldUploadWidgetCloudinaryInstance = any;
export type CldUploadWidgetWidgetInstance = any;

export interface CldUploadWidgetProps {
  children?: ({ cloudinary, widget, open, results, error }: CldUploadWidgetPropsChildren) => JSX.Element;
  config?: ConfigOptions;
  onError?: CldUploadEventCallbackError;
  onOpen?: CldUploadEventCallbackWidgetOnly;
  /**
   * @deprecated use onSuccess instead
   */
  onUpload?: CldUploadEventCallbackNoOptions;
  onAbort?: CldUploadEventCallback;
  onBatchCancelled?: CldUploadEventCallback;
  onClose?: CldUploadEventCallback;
  onDisplayChanged?: CldUploadEventCallback;
  onPublicId?: CldUploadEventCallback;
  onQueuesEnd?: CldUploadEventCallback;
  onQueuesStart?: CldUploadEventCallback;
  onRetry?: CldUploadEventCallback;
  onShowCompleted?: CldUploadEventCallback;
  onSourceChanged?: CldUploadEventCallback;
  onSuccess?: CldUploadEventCallback;
  onTags?: CldUploadEventCallback;
  onUploadAdded?: CldUploadEventCallback;
  options?: CloudinaryUploadWidgetOptions;
  signatureEndpoint?: URL | RequestInfo;
  uploadPreset?: string;
  onAbortAction?: CldUploadEventAction;
  onBatchCancelledAction?: CldUploadEventAction;
  onCloseAction?: CldUploadEventAction;
  onDisplayChangedAction?: CldUploadEventAction;
  onPublicIdAction?: CldUploadEventAction;
  onQueuesEndAction?: CldUploadEventAction;
  onQueuesStartAction?: CldUploadEventAction;
  onRetryAction?: CldUploadEventAction;
  onShowCompletedAction?: CldUploadEventAction;
  onSourceChangedAction?: CldUploadEventAction;
  onSuccessAction?: CldUploadEventAction;
  onTagsAction?: CldUploadEventAction;
  onUploadAddedAction?: CldUploadEventAction;
}

export type CldUploadWidgetPropsChildren = {
  cloudinary: CldUploadWidgetCloudinaryInstance;
  widget: CldUploadWidgetWidgetInstance;
  error?: CloudinaryUploadWidgetError;
  isLoading?: boolean;
  results?: CloudinaryUploadWidgetResults;
} & CloudinaryUploadWidgetInstanceMethods;

export type CldUploadEventCallback = (results: CloudinaryUploadWidgetResults, widget: CldUploadEventCallbackWidget) => void;
export type CldUploadEventAction = (results: CloudinaryUploadWidgetResults) => void;
export type CldUploadEventCallbackNoOptions = (results: CloudinaryUploadWidgetResults, widget: CldUploadWidgetWidgetInstance) => void;
export type CldUploadEventCallbackWidgetOnly = (widget: CldUploadWidgetWidgetInstance) => void;
export type CldUploadEventCallbackError = (error: CloudinaryUploadWidgetError, widget: CldUploadEventCallbackWidget) => void;

export type CldUploadEventCallbackWidget = {
  widget: CldUploadWidgetWidgetInstance;
} & CloudinaryUploadWidgetInstanceMethods;
