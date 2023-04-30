import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ipcRenderer, shell } from 'electron';
import Logo from '@assets/logo.png';
import { ROUTER_ENTRY } from '@common/constants/router';
import { isHttpOrHttpsUrl } from '@common/utils/router';
import './index.less';

function Root() {
  const navigate = useNavigate();

  useEffect(() => {
    // 1. 向主进程发送消息，期望得到应用程序的路径
    ipcRenderer.send('get-root-path', '');

    // 2. 监听从主进程发送回来的消息 获取目前应用的路径
    ipcRenderer.on('reply-root-path', (event, arg: string) => {
      if (arg) {
        console.log('应用程序路径: ', arg);
      } else {
        console.log('获取应用程序的路径出错');
      }
    });
  });

  const onRouterToLink = (router: TSRouter.Item) => {
    if (isHttpOrHttpsUrl(router.url)) {
      shell.openExternal(router.url);
    } else {
      // 这里的url值为map对应的路由
      navigate(router.url);
      ipcRenderer.send('change-window-size', { width: 480, height: 600 });
      console.log('跳转到登录页');
    }
  };

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
