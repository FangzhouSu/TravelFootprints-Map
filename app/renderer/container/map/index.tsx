// TODO: 引用的地图库不支持 TS 许多类型定义有坑 回头再看看怎么解决这些ts报错
import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router';
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
} from '@uiw/react-amap';
import { Modal } from 'antd';
import './index.less';
import UserInfo from '../userInfo/index';
import Notes from '../Notes';

function TravelMap() {
  const history = useHistory();

  // TODO: 展示笔记的时候需要重新渲染整个应用 包括地图 需要局部渲染Notes组件
  const [showNotes, setShowNotes] = useState(true);
  // const showNotes = useRef(true);
  const currentPosition = useRef<AMap.LngLat | undefined>(undefined);
  const mapRef = useRef<{ map?: AMap.Map }>({});

  const lnglat = useRef<AMap.LngLat | undefined>(undefined);

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

        setShowNotes(true);
        currentPosition.current = lnglat.current;
        console.log('父节点-showNotes', showNotes, currentPosition.current);
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

  const MainMap = () => (
    <div>
      <Map
        ref={mapRef}
        style={{ width: '100vw', height: '100vh' }}
        onRightClick={(e) => {
          lnglat.current = e.lnglat;
        }}
      >
        <div>
          <ScaleControl offset={[16, 30]} position="LB" />
          <ToolBarControl offset={[16, 10]} position="RB" />
          <ControlBarControl offset={[16, 180]} position="RB" />
          <Geolocation
            type="cityInfo"
            // 是否使用高精度定位，默认:true
            enableHighAccuracy={true}
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
            <ContextMenu.Item text="添加标记" onClick={() => handleMenu('marker')} />
          </ContextMenu>
        </div>
      </Map>
      <Modal title="游记记录📝" open={showNotes} onOk={handleOk} onCancel={handleCancel}>
        {/* TODO: 打点位置更改则销毁一个笔记进程并开启另一个笔记进程 为了展示效果 暂时直接打开笔记部分  */}
        <Notes position={currentPosition.current} />
      </Modal>
    </div>
  );

  return (
    <div>
      <UserInfo />
      <APILoader akay="1345e9c65fb53dce6257f421266266dc">
        <MainMap />
      </APILoader>
    </div>
  );
}

export default TravelMap;
