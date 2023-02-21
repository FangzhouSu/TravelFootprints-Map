import React from "react";
import { useHistory } from 'react-router';
import './index.less'

function Map() {
  const history = useHistory();

  return (
    <div>
      <button onClick={() => history.push('/')}>backToRoot</button>
    </div>
  );
}

export default Map;
