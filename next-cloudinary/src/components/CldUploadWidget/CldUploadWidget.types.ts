// TODO: widget needs to be typed

export type CldUploadWidgetCloudinaryInstance = any;
export type CldUploadWidgetWidgetInstance = any;

type CustomURL = `https://${string}.${string}`;

export interface CldUploadWidgetResults {
  event?: string;
  info?: string | CldUploadWidgetInfo;
}

export interface CldUploadWidgetInfo {
  access_mode: 'public' | 'authenticated';
  api_key: string;
  asset_id: string;
  batchId: string;
  bytes: number;
  context: Record<string, Record<string, string>>;
  created_at: string;
  etag: string;
  folder: string;
  format: string;
  height: number;
  hook_execution: Record<string, unknown>;
  id: string;
  info: Record<string, unknown>;
  original_filename: string;
  pages: number;
  path: string;
  placeholder: boolean;
  public_id: string;
  resource_type: 'image' | 'raw' | 'video' | 'auto';
  secure_url: string;
  signature: string;
  tags: string[];
  thumbnail_url: string;
  type: 'upload' | 'private' | 'authenticated';
  url: string;
  version: number;
  width: number;
  [key: string]: unknown;
}

export type CldUploadWidgetDestroyInstanceMethodOptions = {
  removeThumbnails: boolean;
}

export type CldUploadWidgetCloseInstanceMethodOptions = {
  quiet: boolean;
}

export type CldUploadWidgetOpenInstanceMethodOptions = {
  files: CustomURL[];
}

export type CldUploadWidgetOpenWidgetSources =
  | 'local'
  | 'url'
  | 'camera'
  | 'image_search'
  | 'google_drive'
  | 'dropbox'
  | 'facebook'
  | 'instagram'
  | 'shutterstock'
  | 'getty'
  | 'istock'
  | 'unsplash'
  | null;

type CldUploadWidgetUpdateInstanceMethodOptions = Omit<
  CldUploadWidgetPropsOptions,
  "secure" | "uploadSignature" | "getTags" | "preBatch" | "inlineContainer" | "fieldName"
> & {
  cloudName: string;
  uploadPreset: string;
}

export interface CldUploadWidgetInstanceMethods {
  close: (options?: CldUploadWidgetCloseInstanceMethodOptions) => void;
  destroy: (options?: CldUploadWidgetDestroyInstanceMethodOptions) => Promise<void>;
  hide: () => void;
  isDestroyed: () => boolean;
  isMinimized: () => boolean;
  isShowing: () => boolean;
  minimize: () => void;
  open: (widgetSource?: CldUploadWidgetOpenWidgetSources, options?: CldUploadWidgetOpenInstanceMethodOptions) => void;
  show: () => void;
  update: (options: CldUploadWidgetUpdateInstanceMethodOptions) => void;
}

export type CldUploadWidgetError = {
  status: string;
  statusText: string;
} | string | null;

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

export type CldUploadWidgetPropsChildren = {
  cloudinary: CldUploadWidgetCloudinaryInstance;
  widget: CldUploadWidgetWidgetInstance;

  error?: CldUploadWidgetError;
  isLoading?: boolean;
  results?: CldUploadWidgetResults;
} & CldUploadWidgetInstanceMethods;

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
  detection: string;
  on_success: string;
}

export type CldUploadEventCallback = (results: CldUploadWidgetResults, widget: CldUploadEventCallbackWidget) => void;
export type CldUploadEventCallbackNoOptions = (results: CldUploadWidgetResults, widget: CldUploadWidgetWidgetInstance) => void;
export type CldUploadEventCallbackWidgetOnly = (widget: CldUploadWidgetWidgetInstance) => void;
export type CldUploadEventCallbackError = (error: CldUploadWidgetError, widget: CldUploadWidgetWidgetInstance) => void;

export type CldUploadEventCallbackWidget = {
  widget: CldUploadWidgetWidgetInstance;
} & CldUploadWidgetInstanceMethods;
