// 模块路径
const ROUTER = {
  root: '/',
  map: '/map',
};

export default ROUTER;

export const ROUTER_KEY = {
  root: 'root',
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
    url: ROUTER.map,
    key: ROUTER_KEY.map,
    text: '快速开始',
  },
];