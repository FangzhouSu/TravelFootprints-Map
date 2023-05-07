import React, { useEffect } from 'react';
import MDEditor, { selectWord } from '@uiw/react-md-editor';
import { Modal } from 'antd';
// No import is required in the WebPack.
// import "@uiw/react-md-editor/dist/markdown-editor.css";

interface NotesProps {
  position?: AMap.LngLat | undefined;
  mkdSTR: string;
  preview?: string;
}

const mkdStr = `
# 记录电子科技大学一日游📝

**Hello world!!!**

[![](https://avatars.githubusercontent.com/u/75036021?v=4)](https://github.com/FangzhouSu)


`;

export default function Notes(props: NotesProps) {
  const { position, mkdSTR, preview } = props;
  const [value, setValue] = React.useState(mkdSTR);

  useEffect(() => {
    console.log('note位置', position);
  }, [position]);

  return (
    // 根据show的true/false 显示或者隐藏一个Modal
    // preview?: 'live' | 'edit' | 'preview' Default value live, Show markdown preview.
    <div data-color-mode="light">
      <MDEditor height={400} value={value} preview={preview} onChange={setValue} />
    </div>
  );
}
