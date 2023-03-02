import { ImageProps } from 'next/image';
import { ImageOptions } from '@cloudinary-util/url-loader';
import { MutableRefObject } from 'react';

type CldImageProps = Omit<ImageProps, 'src'> & ImageOptions & {
    src: string;
    preserveTransformations?: boolean;
};
declare const CldImage: (props: CldImageProps) => JSX.Element;

interface CldOgImageProps {
    alt: string;
    crop?: string;
    excludeTags?: Array<string>;
    gravity?: string;
    height: string | number;
    src: string;
    twitterTitle?: string;
    width: string | number;
}
declare const CldOgImage: ({ excludeTags, twitterTitle, ...props }: CldOgImageProps) => JSX.Element;

interface CldUploadWidgetProps {
    children?: ({ cloudinary, widget, open, results, error }: CldUploadWidgetPropsChildren) => JSX.Element;
    onClose?: Function;
    onError?: Function;
    onOpen?: Function;
    onUpload?: Function;
    options?: CldUploadWidgetPropsOptions;
    signatureEndpoint?: URL | RequestInfo;
    uploadPreset?: string;
}
interface CldUploadWidgetPropsChildren {
    cloudinary: any;
    widget: any;
    open: Function;
    results?: object;
    error?: any;
}
interface CldUploadWidgetPropsOptions {
    encryption?: {
        key: string;
        iv: string;
    };
    defaultSource?: string;
    maxFiles?: number;
    multiple?: boolean;
    sources?: Array<"camera" | "dropbox" | "facebook" | "gettyimages" | "google_drive" | "image_search" | "instagram" | "istock" | "local" | "shutterstock" | "unsplash" | "url">;
    cropping?: boolean;
    croppingAspectRatio?: number;
    croppingCoordinatesMode?: string;
    croppingDefaultSelectionRatio?: number;
    croppingShowBackButton?: boolean;
    croppingShowDimensions?: boolean;
    showSkipCropButton?: boolean;
    dropboxAppKey?: string;
    facebookAppId?: string;
    googleApiKey?: string;
    googleDriveClientId?: string;
    instagramClientId?: string;
    searchByRights?: boolean;
    searchBySites?: Array<string>;
    context?: object;
    folder?: string;
    publicId?: string;
    resourceType?: string;
    tags?: Array<string>;
    uploadSignature?: string | Function;
    uploadSignatureTimestamp?: number;
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
    fieldName?: string;
    form?: string;
    thumbnails?: string;
    thumbnailTransformation?: string | Array<object>;
    buttonCaption?: string;
    buttonClass?: string;
    text?: object;
    theme?: string;
    styles?: object;
    autoMinimize?: boolean;
    getTags?: Function;
    getUploadPresets?: Function;
    inlineContainer?: any;
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
interface CldUploadWidgetResults {
    event: string;
    info: string;
}

declare const CldUploadWidget: ({ children, onClose, onError, onOpen, onUpload, options, signatureEndpoint, uploadPreset, }: CldUploadWidgetProps) => JSX.Element;

interface CldUploadButtonProps extends Omit<CldUploadWidgetProps, 'children'> {
    children?: JSX.Element | string | Array<JSX.Element | string>;
    onClick?: Function;
}
declare const CldUploadButton: ({ children, onClick, onError, onUpload, options, signatureEndpoint, uploadPreset, ...props }: CldUploadButtonProps) => JSX.Element;

interface CloudinaryVideoPlayer {
    on: Function;
}

interface CldVideoPlayerProps {
    autoPlay?: string;
    colors?: CldVideoPlayerPropsColors;
    controls?: boolean;
    fontFace?: string;
    height: string | number;
    id?: string;
    logo?: boolean | CldVideoPlayerPropsLogo;
    loop?: boolean;
    muted?: boolean;
    onDataLoad?: Function;
    onError?: Function;
    onMetadataLoad?: Function;
    onPause?: Function;
    onPlay?: Function;
    onEnded?: Function;
    playerRef?: MutableRefObject<CloudinaryVideoPlayer | null>;
    src: string;
    version?: string;
    videoRef?: MutableRefObject<HTMLVideoElement | null>;
    width: string | number;
}
interface CldVideoPlayerPropsColors {
    accent?: string;
    base?: string;
    text?: string;
}
interface CldVideoPlayerPropsLogo {
    imageUrl?: string;
    onClickUrl?: string;
}

declare const CldVideoPlayer: (props: CldVideoPlayerProps) => JSX.Element;

interface CloudinaryLoaderCldOptions {
    heightResize?: string | number;
    widthResize?: string | number;
}
interface CloudinaryLoaderLoaderOptions {
    height?: string | number;
    width?: string | number;
}
interface CloudinaryLoader {
    loaderOptions: CloudinaryLoaderLoaderOptions;
    imageProps: ImageProps;
    cldOptions: CloudinaryLoaderCldOptions;
    cldConfig?: object;
}
declare function cloudinaryLoader({ loaderOptions, imageProps, cldOptions, cldConfig }: CloudinaryLoader): string;

export { CldImage, CldImageProps, CldOgImage, CldOgImageProps, CldUploadButton, CldUploadButtonProps, CldUploadWidget, CldUploadWidgetProps, CldUploadWidgetPropsChildren, CldUploadWidgetPropsOptions, CldUploadWidgetResults, CldVideoPlayer, CldVideoPlayerProps, CldVideoPlayerPropsColors, CldVideoPlayerPropsLogo, CloudinaryLoader, CloudinaryLoaderCldOptions, CloudinaryLoaderLoaderOptions, CloudinaryVideoPlayer, cloudinaryLoader };
