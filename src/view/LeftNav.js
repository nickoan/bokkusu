import React from 'react';
import styled from "styled-components";

const LeftBar = styled.div`
  width: 200px;
  position: absolute;
  height: calc(100vh);
  background-color: #f8f9fa;
`;

export default React.memo(() => {
  return (
    <LeftBar>
      <ul>
        <p>a</p>
        <p>b</p>
      </ul>
    </LeftBar>
  );
});