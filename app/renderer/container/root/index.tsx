import React from 'react';
import { useHistory } from 'react-router';
import { shell } from 'electron';
import Logo from '@assets/logo.png';
import { ROUTER_ENTRY } from '@common/constants/router';
import { isHttpOrHttpsUrl } from '@common/utils/router';
import './index.less';

function Root() {
  const history = useHistory();

  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      shell.openExternal(router.url);
    } else {
      // 这里的url值为map对应的路由
      history.push(router.url);   
      console.log('跳转到登录页');
    }
  }

  return (
    <div styleName="root">
      <div styleName="container">
        <img src={Logo} alt="" />
        <div styleName="title">旅行足迹👣地图</div>
        <div styleName="tips">帮助你快速获取旅行攻略、记录📝自己的旅行</div>
        <div styleName="action">
          {ROUTER_ENTRY.map((router: TSRouter.Item) => {
            return (
              <div key={router.key} styleName="item" onClick={() => onRouterToLink(router)}>
                {router.text}
              </div>
            );
          })}
        </div>
        <div styleName="copyright">
          <div styleName="footer">
            <p styleName="copyright">
              Copyright © 2018-{new Date().getFullYear()} All Rights Reserved. Copyright By billSu
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Root;