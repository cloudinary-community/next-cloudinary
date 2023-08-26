// TODO: widget needs to be typed

export type CldUploadWidgetCloudinaryInstance = any;
export type CldUploadWidgetWidgetInstance = any;

export interface CldUploadWidgetResults {
  event?: string;
  info?: string | object;
}

export type CldUploadWidgetError = string | null;

export interface CldUploadWidgetProps {
  children?: ({ cloudinary, widget, open, results, error }: CldUploadWidgetPropsChildren) => JSX.Element;
  onError?: CldUploadEventCallbackError;
  onOpen?: CldUploadEventCallbackWidgetOnly;
  onUpload?: CldUploadEventCallbackNoOptions;
  onAbort?: CldUploadEventCallback;
  onBatchCancelled?: CldUploadEventCallback;
  onClose?: CldUploadEventCallbackWidgetOnly;
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
  options?: CldUploadWidgetPropsOptions;
  signatureEndpoint?: URL | RequestInfo;
  uploadPreset?: string;
}

export interface CldUploadWidgetPropsChildren {
  cloudinary: CldUploadWidgetCloudinaryInstance;
  widget: CldUploadWidgetWidgetInstance;

  error?: CldUploadWidgetError;
  isLoading?: boolean;
  results?: CldUploadWidgetResults;

  close: Function;
  destroy: Function;
  hide: Function;
  isDestroyed: Function;
  isMinimized: Function;
  isShowing: Function;
  minimize: Function;
  open: Function;
  show: Function;
  update: Function;
}

// Parameters sourced from:
// https://cloudinary.com/documentation/upload_widget_reference#parameters

export interface CldUploadWidgetPropsOptions {
  // Widget

  encryption?: {
    key: string;
    iv: string;
  }
  defaultSource?: string;
  maxFiles?: number;
  multiple?: boolean;
  sources?: Array<
    "camera"
    | "dropbox"
    | "facebook"
    | "gettyimages"
    | "google_drive"
    | "image_search"
    | "instagram"
    | "istock"
    | "local"
    | "shutterstock"
    | "unsplash"
    | "url"
  >;

  // Cropping

  cropping?: boolean;
  croppingAspectRatio?: number;
  croppingCoordinatesMode?: string;
  croppingDefaultSelectionRatio?: number;
  croppingShowBackButton?: boolean;
  croppingShowDimensions?: boolean;
  showSkipCropButton?: boolean;

  // Sources

  dropboxAppKey?: string;
  facebookAppId?: string;
  googleApiKey?: string;
  googleDriveClientId?: string;
  instagramClientId?: string;
  searchByRights?: boolean;
  searchBySites?: Array<string>;

  // Upload

  context?: object;
  folder?: string;
  publicId?: string;
  resourceType?: string;
  tags?: Array<string>;
  uploadSignature?: string | Function;
  uploadSignatureTimestamp?: number;

  // Client Side

  clientAllowedFormats?: Array<string>;
  croppingValidateDimensions?: boolean;
  maxChunkSize?: number;
  maxImageFileSize?: number;
  maxImageHeight?: number;
  maxImageWidth?: number;
  maxFileSize?: number;
  maxRawFileSize?: number;
  maxVideoFileSize?: number;
  minImageHeight?: number;
  minImageWidth?: number;
  validateMaxWidthHeight?: boolean;

  // Containing Page

  fieldName?: string;
  form?: string;
  thumbnails?: string;
  thumbnailTransformation?: string | Array<object>;

  // Customization

  buttonCaption?: string;
  buttonClass?: string;
  text?: object;
  theme?: string;
  styles?: object;

  // Advanced

  autoMinimize?: boolean;
  getTags?: Function;
  getUploadPresets?: Function;
  inlineContainer?: any; // string or DOM element
  language?: string;
  preBatch?: Function;
  prepareUploadParams?: Function;
  queueViewPosition?: string;
  showAdvancedOptions?: boolean;
  showCompletedButton?: boolean;
  showInsecurePreview?: boolean;
  showPoweredBy?: boolean;
  showUploadMoreButton?: boolean;
  singleUploadAutoClose?: boolean;
}

export type CldUploadEventCallback = (results: CldUploadWidgetResults, widget: CldUploadEventCallbackWidget) => void;
export type CldUploadEventCallbackNoOptions = (results: CldUploadWidgetResults, widget: CldUploadWidgetWidgetInstance) => void;
export type CldUploadEventCallbackWidgetOnly = (widget: CldUploadWidgetWidgetInstance) => void;
export type CldUploadEventCallbackError = (error: CldUploadWidgetError, widget: CldUploadWidgetWidgetInstance) => void;

export interface CldUploadEventCallbackWidget {
  close: Function;
  destroy: Function;
  hide: Function;
  isDestroyed: Function;
  isMinimized: Function;
  isShowing: Function;
  minimize: Function;
  open: Function;
  show: Function;
  update: Function;
  widget: CldUploadWidgetWidgetInstance;
}