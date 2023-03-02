import { useInView } from 'react-intersection-observer';

import Video from '../Video';

const VideoLazy = (props) => {
  const { width = 560, height = 315 } = props;

  const { ref, inView } = useInView({
    triggerOnce: true
  });

  return (
    <div ref={ref}>
      {inView && <Video {...props} />}
      {!inView && (
        <div style={{
          width: '100%',
          height: 0,
          paddingTop: `${(height / width) * 100}%`,
        }} />
      )}
    </div>
  );
}

export default VideoLazy;