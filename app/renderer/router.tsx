import React from 'react';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import Root from '@src/container/root';
import Map from '@src/container/map';
import Login from '@src/container/login';
import ROUTER from '@common/constants/router';

function Router() {
  return (
    <HashRouter>
      <Switch>
        <Route path={ROUTER.root} exact>
          <Root />
        </Route>
        <Route path={ROUTER.map} exact>
          <Map />
        </Route>
        <Route path={ROUTER.login} exact>
          <Login />
        </Route>
      </Switch>

      {/* 重定向到首页 */}
      <Redirect to={ROUTER.root} />
    </HashRouter>
  );
}
export default Router;
