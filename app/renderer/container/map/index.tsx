import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { get } from '@common/utils/index';
import { Map, APILoader, ScaleControl, ToolBarControl, ControlBarControl, Geolocation } from '@uiw/react-amap';
import './index.less';
import UserInfo from '../userInfo/index';

function TravelMap() {
  const history = useHistory();
  const [avater, setAvater] = useState('');

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

  useEffect(() => {
    // todo: fetchUserInfo时会错发一个7001端口的login接口 怪事！
    // fetchUserInfo();
    console.log('enter the map');
  }, []);

  const fetchUserInfo = async () => {
    try {
      const { data } = await get('api/user/get_userinfo');
      setAvater(data.avatar);
    } catch (err: any) {
      console.error(err.msg);
    }
  };

  return (
    <div>
      <UserInfo onClickUser={fetchUserInfo} />
      <APILoader akay="1345e9c65fb53dce6257f421266266dc">
        <MainMap />
        <button onClick={() => history.push('/')}>backToRoot</button>
      </APILoader>
    </div>
  );
}

export default TravelMap;
