import { useCallback, useState } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { tokyoNight } from '@uiw/codemirror-theme-tokyo-night';
import { javascript } from '@codemirror/lang-javascript';
import { EditorView } from "@codemirror/view";
import parse from 'html-react-parser';

import { CldImage } from '../../../next-cloudinary';

import styles from './VisualEditor.module.scss';

const VisualEditor = ({ defaultCode }) => {
  const [code, setCode] = useState(defaultCode);

  const cleanCode = code?.trim().replace(/^\s+|\s+$/g, '') || '';

  const onChange = useCallback((value, viewUpdate) => {
    setCode(value);
  }, []);

  return (
    <div className={styles.visualEditor}>
      <CodeMirror
        value={cleanCode}
        height="100%"
        className={styles.editor}
        extensions={[
          javascript({ jsx: true }),
          EditorView.baseTheme({
            "&.cm-editor": { overflow: "auto" },
            ".cm-scroller": { overflow: "auto" }
          })
        ]}
        theme={tokyoNight}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        onChange={onChange}
      />
      {parse(cleanCode, {
        replace(domNode) {
          if (domNode.name === 'cldimage') {
            console.log('domNode.attribs', domNode.attribs)
            return <CldImage {...domNode.attribs} />;
          }
        },
      })}
    </div>
  )
}

export default VisualEditor;