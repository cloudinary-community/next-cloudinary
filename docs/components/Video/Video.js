import { getUrlParamsFromString } from '../../lib/parse';

import styles from './Video.module.scss';

export const Video = ({
  className,
  title,
  url,
  width = 560,
  height = 315,
}) => {
  const videoId = getUrlParamsFromString(url).find(({ key }) => key === 'v')?.value;

  return (
    <figure className={styles.video}>
      <div
        className={styles.videoContainer}
        style={{
          paddingTop: `${(height / width) * 100}%`,
        }}
      >
        <iframe
          title={title}
          width={width}
          height={height}
          src={`https://www.youtube.com/embed/${videoId}?feature=oembed`}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          autoPlay
        />
      </div>
      <figcaption>
        <a href={url} rel="noopener" target="_blank">
          View on YouTube
        </a>
      </figcaption>
    </figure>
  );
};

export default Video;