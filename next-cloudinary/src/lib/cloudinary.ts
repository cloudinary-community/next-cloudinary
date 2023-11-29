/**
 * pollForProcessingImage
 */

export interface PollForProcessingImageOptions {
  src: string;
}

export async function pollForProcessingImage(options: PollForProcessingImageOptions): Promise<boolean> {
  const { src } = options;
  try {
    await new Promise((resolve, reject) => {
      fetch(src).then(res => {
        if ( !res.ok ) {
          reject(res);
          return;
        }
        resolve(res);
      });
    });
  } catch(e: any) {
    if ( e.status === 423 ) {
      return await pollForProcessingImage(options);
    }
    return false;
  }
  return true;
}

export function checkForCloudName(cloudName: string | undefined) {
  if (!cloudName) {
    throw new Error("A Cloudinary Cloud name is required, please make sure" +
        " NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your .env file");
  }
}