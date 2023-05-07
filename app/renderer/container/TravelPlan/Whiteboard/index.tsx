// import React, { useState, useEffect, useRef } from 'react';
// import { fabric } from 'fabric';
// import WhiteBoard, {
//   getWhiteBoardData,
//   loadWhiteBoardData,
//   addWhiteBoardObject,
//   modifyWhiteBoardObjects,
//   removeWhiteBoardObjects,
//   clearWhiteBoardContext,
//   createWhiteBoardSelection,
//   updateWhiteBoardSelection,
//   clearWhiteBoardSelection,
// } from 'fabric-whiteboard';

// const Whiteboard = (props: any) => {
//   const canvasRef = useRef(null);
//   const { width, height } = props;

//   useEffect(() => {
//     const canvas = new fabric.Canvas(canvasRef.current, {
//       width: 600,
//       height: 400,
//     });
//     canvas.backgroundColor = 'rgba(0,0,0,0.1)';
//   }, []);

//   // 画笔
//   // const pencil = new fabric.PencilBrush(canvas);
//   // pencil.color = 'black';
//   // pencil.width = 5;
//   // 橡皮擦

//   // 撤销重做
//   // const undo = () => canvas.undo();
//   // const redo = () => canvas.redo();

//   // 保存与读取
//   const saveData = () => {
//     /* 将canvas数据保存 */
//   };
//   const loadData = () => {
//     /* 读取数据渲染到canvas */
//   };

//   // 返回白板组件
//   return <canvas width={width} height={height}></canvas>;
// };

// export default Whiteboard;

import React, { useState, useRef } from 'react';
import { Map, APILoader, MouseTool, MouseToolDrawType, AutoComplete } from '@uiw/react-amap';
import { Button } from 'antd';

const Example = () => {
  const [active, setActive] = useState(false);
  const [type, setType] = useState();
  const handleDraw = (type: any) => {
    setType(type);
    setActive(true);
  };
  return (
    <>
      <Button onClick={() => handleDraw(MouseToolDrawType.MARKER)}>标记兴趣点📌</Button>
      <Button onClick={() => handleDraw(MouseToolDrawType.POLYGON)}>绘制不规则区域📿</Button>
      <Button onClick={() => handleDraw(MouseToolDrawType.CIRCLE)}>绘制圆形⭕️</Button>
      <Button onClick={() => handleDraw(MouseToolDrawType.RECTANGLE)}>绘制矩形🖼</Button>
      <Button onClick={() => handleDraw(MouseToolDrawType.RULE)}>绘制旅行路径🛣</Button>
      {/* <Button onClick={() => handleDraw(MouseToolDrawType.RECTZOOMIN)}>绘制 RectZoomIn</Button>
      <Button onClick={() => handleDraw(MouseToolDrawType.RECTZOOMOUT)}>绘制 RectZoomOut</Button> */}
      <div style={{ width: '100%', height: '500px' }}>
        <Map zoom={14} center={[120.15, 30.26]} dragEnable={false}>
          <MouseTool
            active={active}
            type={type}
            onDraw={(e) => {
              setActive(false);
              console.log('onDraw:>>', e);
            }}
          />
        </Map>
      </div>
    </>
  );
};

const Mount = () => (
  <APILoader akay="a7a90e05a37d3f6bf76d4a9032fc9129" plugin="AMap.MouseTool">
    <Example />
  </APILoader>
);

export default Mount;
