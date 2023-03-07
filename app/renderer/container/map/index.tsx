import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { get } from '@common/utils/index';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation } from '@uiw/react-amap';
import './index.less';
import UserInfo from '../userInfo/index';

function TravelMap() {
  const history = useHistory();

  const MainMap = () => (
    <div>
      <Map style={{ width: '100vw', height: '100vh' }}>
        <div>
          <ScaleControl offset={[16, 30]} position="LB" />
          <ToolBarControl offset={[16, 10]} position="RB" />
          <ControlBarControl offset={[16, 180]} position="RB" />
          <Geolocation
            maximumAge={100000}
            borderRadius="5px"
            position="RB"
            offset={[16, 80]}
            zoomToAccuracy={true}
            showCircle={true}
          />
        </div>
      </Map>
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
