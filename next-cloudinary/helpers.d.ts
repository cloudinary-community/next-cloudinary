import { ImageOptions, ConfigOptions, AnalyticsOptions, VideoOptions } from '@cloudinary-util/url-loader';

/**
 * getCldImageUrl
 */
interface GetCldImageUrlOptions extends ImageOptions {
}
interface GetCldImageUrlConfig extends ConfigOptions {
}
interface GetCldImageUrlAnalytics extends AnalyticsOptions {
}
interface GetCldImageUrl {
    options: GetCldImageUrlOptions;
    config?: GetCldImageUrlConfig;
    analytics?: GetCldImageUrlAnalytics;
}
declare function getCldImageUrl(options: GetCldImageUrlOptions, config?: GetCldImageUrlConfig, analytics?: GetCldImageUrlAnalytics): string;

/**
 * getCldImageUrl
 */
interface GetCldOgImageUrl extends GetCldImageUrl {
}
interface GetCldOgImageUrlOptions extends GetCldImageUrlOptions {
}
declare function getCldOgImageUrl(options: GetCldOgImageUrlOptions): string;

/**
 * getCldVideoUrl
 */
interface GetCldVideoUrlOptions extends VideoOptions {
}
interface GetCldVideoUrlConfig extends ConfigOptions {
}
interface GetCldVideoUrlAnalytics extends AnalyticsOptions {
}
declare function getCldVideoUrl(options: GetCldVideoUrlOptions, config?: GetCldVideoUrlConfig, analytics?: GetCldVideoUrlAnalytics): string;

export { GetCldImageUrl, GetCldImageUrlAnalytics, GetCldImageUrlConfig, GetCldImageUrlOptions, GetCldOgImageUrl, GetCldOgImageUrlOptions, GetCldVideoUrlAnalytics, GetCldVideoUrlConfig, GetCldVideoUrlOptions, getCldImageUrl, getCldOgImageUrl, getCldVideoUrl };
