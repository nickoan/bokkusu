import ReactDOM from 'react-dom';
import React from 'react';
import LeftNav from "./LeftNav";
import styled from 'styled-components';

const StyledDiv = styled.div`
 padding: 0px;
`;

ReactDOM.render(
  <React.StrictMode>
    <StyledDiv>
      <LeftNav />
      hello world {process.env.NVM_DIR}
    </StyledDiv>
  </React.StrictMode>,
  document.getElementById('root')
);