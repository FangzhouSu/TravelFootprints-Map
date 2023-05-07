import React, { useState } from 'react';
import { Affix, Button, message, Steps } from 'antd';
import TravelMap from '../map';
import Whiteboard from './Whiteboard';
import { day1Plan } from '../NoteLIst/Notes';
import Notes from '../Notes';
import './index.less';

const steps = [
  {
    title: '找寻目的地',
    content: <TravelMap height="70vh" ifSearch />,
  },
  {
    title: '借助白板做计划',
    content: (
      <>
        {/* <TravelMap height="70vh" ifDraw /> */}
        <Whiteboard />
      </>
    ),
  },
  {
    title: '记录计划',
    content: <Notes mkdSTR={day1Plan} />,
  },
];

const TravelPlan = () => {
  const [showWhiteboard, setShowWhiteboard] = useState(false);
  const [current, setCurrent] = useState(0);
  const [whiteboardPos, setWhiteboardPos] = useState({ x: 0, y: 0 });

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  const onMapClick = (e: any) => {
    setShowWhiteboard(true);
    // setWhiteboardPos({
    //   x: e.pixel.x,
    //   y: e.pixel.y,
    // });
  };

  return (
    <>
      <Steps current={current} items={items} />
      <div styleName="steps-content">{steps[current].content}</div>
      <div styleName="steps-action">
        {current < steps.length - 1 && (
          <Button type="primary" onClick={() => next()}>
            下一步
          </Button>
        )}
        {current === steps.length - 1 && (
          <Button type="primary" onClick={() => message.success('您的旅行规划已经同步到「我的游记」')}>
            完成规划!
          </Button>
        )}
        {current > 0 && (
          <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
            上一步
          </Button>
        )}
      </div>
    </>
  );
};

export default TravelPlan;
