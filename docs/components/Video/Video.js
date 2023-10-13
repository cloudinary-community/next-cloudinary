import { getUrlParamsFromString } from '../../lib/parse';
import { useEffect, useRef, useState } from 'react';

import styles from './Video.module.scss';

export const Video = ({
  className,
  title,
  url,
  width = 560,
  height = 315,
}) => {
  const videoId = getUrlParamsFromString(url).find(({ key }) => key === 'v')?.value;
  const [isVideoVisible, setIsVideoVisible] = useState(false);
  const videoContainerRef = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, // Adjust this threshold as needed
    };

    let observer;
    
    if (videoContainerRef.current) {
      observer = new IntersectionObserver(handleIntersection, options);
      observer.observe(videoContainerRef.current);
    }

    return () => {
      if (observer && videoContainerRef.current) {
        observer.unobserve(videoContainerRef.current);
      }
    };
  }, []);

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        setIsVideoVisible(true);
      }
    });
  };

  return (
    <figure className={styles.video}>
      {isVideoVisible ? (
        <div
          ref={videoContainerRef}
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
      ) : (
        <div
          ref={videoContainerRef}
          style={{
            paddingTop: `${(height / width) * 100}%`,
            // width: '100%',
            // height: '100%',
          }}
        ></div>
      )}
      <figcaption>
        <a href={url} rel="noopener" target="_blank">
          View on YouTube
        </a>
      </figcaption>
    </figure>
  );
};

export default Video;
