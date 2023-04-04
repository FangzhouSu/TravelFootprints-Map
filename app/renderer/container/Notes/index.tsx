import React, { useEffect } from 'react';
import MDEditor, { selectWord } from '@uiw/react-md-editor';
import { Modal } from 'antd';
// No import is required in the WebPack.
// import "@uiw/react-md-editor/dist/markdown-editor.css";

interface NotesProps {
  position: AMap.LngLat | undefined;
}

const mkdStr = `
# 记录电子科大一日游📝

---

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/75036021?v=4)](https://github.com/FangzhouSu)

\`\`\`javascript
import React from "react";
import ReactDOM from "react-dom";
import MEDitor from '@uiw/react-md-editor';
thanks for @uiw's library's support.
\`\`\`
`;

export default function Notes(props: NotesProps) {
  const { position } = props;
  const [value, setValue] = React.useState(mkdStr);

  useEffect(() => {
    console.log('note位置', position);
  }, [position]);

  return (
    // 根据show的true/false 显示或者隐藏一个Modal
    <div data-color-mode="light">
      <MDEditor height={400} value={value} onChange={setValue} />
    </div>
  );
}
