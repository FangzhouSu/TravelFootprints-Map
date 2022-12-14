import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './container/Title/index';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div>旅行足迹地图应用</div>
          <div>技术栈： Electron + React + eggjs </div>
          <Login text="testTS" />
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
