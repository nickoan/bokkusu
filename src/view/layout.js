import ReactDOM from 'react-dom';
import React from 'react';
import LeftNav from "./LeftNav";
import styled from 'styled-components';
import ResultTable from "./ResultTable";
const { remote } = require('electron');

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


// const code = `
//  await $.table('users').where({email: 'anning0322@gmail.com'}).run();
// `;
// //
// console.log(remote.getGlobal('ContextExecutor'));
// remote.getGlobal('ContextExecutor')(code).then((res) => console.log(res.$queryResult.rows));