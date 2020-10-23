import ReactDOM from 'react-dom';
import React, {useEffect, useState} from 'react';
import LeftNav from "./LeftNav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import styled from 'styled-components';
import ResultTable from "./ResultTable";
import globalGetter from "./utils/globalGetter";

const StyledDiv = styled.div`
 width: 100%;
 padding: 0px;
`;

const StyledNavbar = styled(Navbar)`
 padding: 0px;
`;

const RightSection = styled.div`
 margin-left: 200px;
 width: calc(100vw - 200px);
 padding-left: 3px;
 border-left: 2px solid gray;
`;

const ScriptArea = styled.textarea`
 width: 100%;
 height: calc(30vh);
 resize:none;
`;

const Main = React.memo(() => {

  const [queryResult, setQueryResult] = useState(null);
  const [code, setCode] = useState('');

  const runCode = async () => {
    if (!code) {
      return;
    }
    const result = await globalGetter('ContextExecutor')(code);
    setQueryResult(result.$queryResult);
  }

  const onScriptChange = (event) => {
    const code = event.target.value;
    setCode(code);
  }

  return (
    <StyledDiv>
      <LeftNav />
      <RightSection>
        <StyledNavbar bg="light" variant="light">
          <Navbar.Brand>
            <Button onClick={runCode} variant="primary">Run</Button>
          </Navbar.Brand>
        </StyledNavbar>
        <ScriptArea onChange={onScriptChange} />
        <ResultTable result={queryResult} />
      </RightSection>
    </StyledDiv>
  )
});

ReactDOM.render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>,
  document.getElementById('root')
);