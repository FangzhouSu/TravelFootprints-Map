// TODO: 引用的地图库不支持 TS 许多类型定义有坑 回头再看看怎么解决这些ts报错
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { get } from '@common/utils/index';
import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
  // LabelMarker,
  ContextMenu,
  ContextMenuItem,
  InfoWindow,
  AutoComplete,
  Marker,
  MouseTool,
  MouseToolDrawType,
} from '@uiw/react-amap';
// import { AMap, Marker } from 'AMap';
import { testNote } from '../NoteLIst/Notes';
import { Modal, Input, Button } from 'antd';
import './index.less';
import UserInfo from '../userInfo/index';
import Notes from '../Notes';

const { Search } = Input;

function TravelMap(props: any) {
  const onClick = props.onClick;
  const h = props.height;
  const ifDraw = props.ifDraw;
  const ifSearch = props.ifSearch;

  // TODO: 展示笔记的时候需要重新渲染整个应用 包括地图 需要局部渲染Notes组件
  const [showNotes, setShowNotes] = useState(false);
  const [active, setActive] = useState(true);
  const [type, setType] = useState();
  // const showNotes = useRef(true);
  const currentPosition = useRef<AMap.LngLat | undefined>(undefined);
  const mapRef = useRef<{ map?: AMap.Map }>(null);
  const inputRef = useRef();

  const lnglat = useRef<AMap.LngLat | undefined>(undefined);
  const [data, setData] = useState({
    poi: {
      id: 'B0FFFPPTEL',
      name: '杭州西湖风景名胜区-断桥',
      district: '浙江省杭州市西湖区',
      adcode: '330106',
      location: [120.151347, 30.258151],
      address: '北山街与白堤交叉口',
      typecode: '110200',
      city: [],
    },
    type: 'select',
  });
  const [input, setInput] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    setInput(inputRef.current);
    console.log('Ref内容为', mapRef.current, inputRef.current);
  }, []);

  const handleDraw = (type: any) => {
    // setType(type);
    // setActive(true);
    console.log('type', type, MouseToolDrawType.RECTANGLE);
  };

  function handleMenu(type: string) {
    if (mapRef && mapRef.current && mapRef.current.map) {
      switch (type) {
        case 'zoomIn':
          mapRef.current.map.zoomIn();
          break;
        case 'zoomOut':
          mapRef.current.map.zoomOut();
          break;
        case 'center':
          mapRef.current.map.setZoomAndCenter(4, [108.946609, 34.262324], false);
          break;
      }

      // 在地图上打标记
      if (type === 'marker' && lnglat.current) {
        new AMap.Marker({
          map: mapRef.current.map,
          position: lnglat.current, //基点位置
        });

        currentPosition.current = lnglat.current;
        console.log('父节点-showNotes', showNotes, currentPosition.current);
      }

      if (type === 'note') {
        setShowNotes(true);
        new AMap.Marker({
          map: mapRef.current.map,
          position: lnglat.current, //基点位置
        });
      }
    }
  }

  const handleOk = () => {
    console.log('游记记录完成');
    // showNotes.current = false;
    setShowNotes(false);
  };

  const handleCancel = () => {
    console.log('取消记录游记');
    // showNotes.current = false;
    setShowNotes(false);
  };

  const onSearch = () => {
    // setInput(inputRef.current);
    if (mapRef && mapRef.current && mapRef.current.map) {
      mapRef.current.map.setZoomAndCenter(14, JSON.parse(JSON.stringify(data, null, 2)).poi.location, true);
    }
    console.log('search框的DOM', inputRef.current);
    console.log('mapRef内容', mapRef.current);
  };

  const MainMap = () => (
    <div>
      {ifSearch && (
        <div styleName="searchBox">
          {/* <input id="input" type="text" ref={inputRef} /> */}
          <Search id="input" placeholder="请输入您的目的地" onSearch={onSearch} enterButton ref={inputRef} />
          {/* {input && ( */}
          <AutoComplete
            input="input"
            outPutDirAuto={false}
            // input={input}
            onSelect={(opts) => {
              setData(opts);
              console.log('@@@@', opts, JSON.parse(JSON.stringify(data, null, 2)).poi.location);
            }}
          />
          {/* )} */}
          {/* <pre style={{ padding: 10, marginTop: 10 }}>{JSON.stringify(data, null, 2)}</pre> */}
        </div>
      )}
      {/* {ifDraw && ( */}
      {/* <div styleName="site-button-ghost-wrapper"> */}
      {/* <Button type="primary" onClick={() => handleDraw(MouseToolDrawType.CIRCLE)} ghost>
        绘制圆圈
      </Button>
      <Button type="primary" onClick={() => handleDraw(MouseToolDrawType.RECTANGLE)} ghost>
        绘制矩形
      </Button>
      <Button type="primary" onClick={() => handleDraw(MouseToolDrawType.POLYLINE)} ghost>
        绘制折线
      </Button>
      <Button type="primary" onClick={() => handleDraw(MouseToolDrawType.RULE)} ghost>
        绘制游玩路线
      </Button>
      <button onClick={() => handleDraw(MouseToolDrawType.CIRCLE)}>ceshi</button> */}
      {/* </div> */}
      {/* )} */}
      <Map
        ref={mapRef}
        style={{ height: h ? h : '80vh' }}
        onRightClick={(e) => {
          lnglat.current = e.lnglat;
        }}
        // dragEnable={false}
        onClick={onClick}
      >
        <div>
          <MouseTool
            active
            type={MouseToolDrawType.RECTANGLE}
            onDraw={(e) => {
              setActive(false);
              console.log('onDraw:>>', e);
            }}
          />
          <ScaleControl offset={[16, 30]} position="LB" />
          <ToolBarControl offset={[16, 10]} position="RB" />
          <ControlBarControl offset={[16, 180]} position="RB" />
          <Geolocation
            type="cityInfo"
            // 是否使用高精度定位，默认:true
            enableHighAccuracy={false}
            // 超过10秒后停止定位，默认：5s
            timeout={10000}
            // 定位成功后是否自动调整地图视野到定位点
            zoomToAccuracy={true}
            onComplete={(data) => {
              console.log('目前城市信息：', data);
            }}
            onError={(data) => {
              console.log('错误返回数据：', data);
            }}
          />
          {/* 忽略以下报错——地图库类型定义有误(给Item父节点则无法正常展示右键菜单)
           * TODO: 修复地图库类型定义❌
           */}
          <ContextMenu>
            <ContextMenu.Item text="放大一级" onClick={() => handleMenu('zoomIn')} />
            <ContextMenu.Item text="缩小一级" onClick={() => handleMenu('zoomOut')} />
            <ContextMenu.Item text="缩放至全国范围" onClick={() => handleMenu('center')} />
            <ContextMenu.Item text="记录足迹👣" onClick={() => handleMenu('marker')} />
            <ContextMenu.Item text="记录游记📝" onClick={() => handleMenu('note')} />
          </ContextMenu>
        </div>
      </Map>
      <Modal
        title="游记记录📝"
        open={showNotes}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="存储游记"
        cancelText="取消"
      >
        {/* TODO: 打点位置更改则销毁一个笔记进程并开启另一个笔记进程 为了展示效果 暂时直接打开笔记部分  */}
        <Notes position={currentPosition.current} mkdSTR={testNote} />
      </Modal>
    </div>
  );

  return (
    <div>
      <UserInfo />
      <APILoader plugin="AMap.MouseTool" akay="1345e9c65fb53dce6257f421266266dc">
        <MainMap />
      </APILoader>
    </div>
  );
}

export default TravelMap;
