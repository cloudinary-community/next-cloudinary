import { useState } from 'react';
import { BsArrowsExpand, BsArrowsCollapse } from 'react-icons/bs'

import styles from './CodeBlock.module.scss';

export const CodeBlock = ({ children }) => {
  const [expanded, setExpanded] = useState(false);
  
  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeBlockCode} data-codeblock-expanded={expanded}>
        { children }
      </div>
      <ul className={styles.codeBlockActions}>
        {!expanded && (
          <li>
            <button onClick={() => setExpanded(true)}>
              <BsArrowsExpand />
              Expand Snippet
            </button>
          </li>
        )}
        {expanded && (
          <li>
            <button onClick={() => setExpanded(false)}>
              <BsArrowsCollapse />
              Collapse Snippet
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

export default CodeBlock;
