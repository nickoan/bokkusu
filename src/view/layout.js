import ReactDOM from 'react-dom';
import React from 'react';
import LeftNav from "./LeftNav";
import styled from 'styled-components';
import ResultTable from "./ResultTable";

const StyledDiv = styled.div`
 width: 100%;
 padding: 0px;
`;

const RightSection = styled.div`
 margin-left: 200px;
 width: calc(100vw - 200px);
 padding: 10px;
`;

const ScriptArea = styled.textarea`
 width: 100%;
 height: calc(30vh);
 resize:none;
`;

ReactDOM.render(
  <React.StrictMode>
    <StyledDiv>
      <LeftNav />
      <RightSection>
        <ScriptArea/>
        <ResultTable />
      </RightSection>
    </StyledDiv>
  </React.StrictMode>,
  document.getElementById('root')
);