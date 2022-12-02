import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <div>旅行足迹地图应用</div>
          <div>技术栈： Electron + React </div>
        </Route>
      </Switch>
    </Router>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));