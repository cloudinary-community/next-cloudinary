import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';

import Playground from '../Playground';

import styles from './PlaygroundLazy.module.scss';

const PlaygroundLazy = (props) => {
  const [inView, setInView] = useState();

  const { ref, inView: scrollInView } = useInView({
    triggerOnce: true
  });

  useEffect(() => {
    if ( inView ) return;

    if ( scrollInView ) {
      setInView(true);
    }

    function onIdle() {
      setInView(true)
    }

    'requestIdleCallback' in window ? requestIdleCallback(onIdle) : setTimeout(onIdle, 1);
  }, [inView, scrollInView])

  return (
    <div ref={ref}>
      {inView && <Playground {...props} />}
      {!inView && (
        <code className={styles.block}>
          { props.children.split('\n').map(line => {
            return (
              <span key={line} className={styles.line}>{ line }</span>
            )
          }) }
        </code>
      )}
    </div>
  );
}

export default PlaygroundLazy;