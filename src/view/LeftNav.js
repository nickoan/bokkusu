import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import globalGetter from "./utils/globalGetter";

const LeftBar = styled.div`
  width: 200px;
  position: absolute;
  height: calc(100vh);
  background-color: #f8f9fa;
  overflow: scroll;
  white-space:nowrap;
`;

export default React.memo(() => {

  const [tableNames, setTableNames] = useState([]);

  useEffect( async () => {
    const result = await globalGetter('listAllTables')();
    setTableNames(result);
  }, [])

  const generateTableNameList = (arr) => {
    return arr.map((name) => {
      return (
        <ListGroup.Item as="li" disabled>
          {name}
        </ListGroup.Item>
      );
    })
  }

  return (
    <LeftBar>
      <ListGroup as="ul" variant="flush">
        <ListGroup.Item as="li" active>
          Edit Database
        </ListGroup.Item>
        {generateTableNameList(tableNames)}
      </ListGroup>
    </LeftBar>
  );
});