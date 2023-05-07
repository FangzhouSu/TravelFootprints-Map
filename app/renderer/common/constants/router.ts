// 模块路径
const ROUTER = {
  root: '/',
  system: '/system',
  map: '/system/map',
  notelist: '/system/notelist',
  travelplan: '/system/travelplan',
  footprint: '/system/footprint',
  login: '/login',
};

export default ROUTER;

export const ROUTER_KEY = {
  root: 'root',
  login: 'login',
  map: 'map',
};

// 入口模块，TS 定义类型必须为 TSRouter.Item
export const ROUTER_ENTRY: TSRouter.Item[] = [
  {
    url: 'https://github.com/FangzhouSu/TravelFootprints-Map',
    key: 'intro',
    text: '介绍 & 源码',
  },
  {
    url: ROUTER.login,
    key: ROUTER_KEY.login,
    text: '快速开始',
  },
];
