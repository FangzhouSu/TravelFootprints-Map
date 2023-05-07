import React from 'react';
import { Navigate, HashRouter, Route, Routes } from 'react-router-dom';
import Root from '@src/container/root';
import System from '@src/container/System';
import NoteList from '@src/container/NoteLIst';
import TravelPlan from '@src/container/TravelPlan';
import UserCenter from '@src/container/FootPrint';
import TravelMap from '@src/container/map';
import Login from '@src/container/login';
import ROUTER from '@common/constants/router';
import FootPrint from '@src/container/FootPrint';

function Router() {
  return (
    <HashRouter>
      <Routes>
        {/* root页-默认路由 */}
        <Route element={<Root />} path={ROUTER.root}></Route>

        {/* 登陆页 */}
        <Route element={<Login />} path={ROUTER.login}></Route>

        {/* 系统主页 */}
        <Route element={<System />} path={ROUTER.system}>
          {/* 地图主页 */}
          <Route element={<TravelMap ifSearch />} path={ROUTER.system}></Route>
          {/* 游记列表 */}
          <Route element={<NoteList />} path={ROUTER.notelist}></Route>
          {/* 规划旅行计划 */}
          <Route element={<TravelPlan />} path={ROUTER.travelplan}></Route>
          {/* 旅行足迹生成 */}
          <Route element={<FootPrint />} path={ROUTER.footprint}></Route>
        </Route>

        {/* 默认路由-root页 */}
        <Route path="*" element={<Navigate to={ROUTER.root} />}></Route>
        {/* <Route path="*" element={<Navigate to={ROUTER.system} />}></Route> */}
      </Routes>
    </HashRouter>
  );
}
export default Router;
