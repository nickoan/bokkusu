import ReactDOM from 'react-dom';
import React from 'react';


ReactDOM.render(
  <React.StrictMode>
    <div>
      hello world {process.env.NVM_DIR}
    </div>
  </React.StrictMode>,
  document.getElementById('root')
);