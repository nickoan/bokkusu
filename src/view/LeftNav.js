import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import globalGetter from "./utils/globalGetter";
import DbSettingModal from "./DbSettingModal";

const LeftBar = styled.div`
  width: 200px;
  position: absolute;
  height: calc(100vh);
  background-color: #f8f9fa;
`;

const StyledGroupWrapper = styled.div`
  height: calc(100vh - 50px);
  overflow: scroll;
  white-space:nowrap;
`;

const ConfigureHeader = styled.li`
  &:hover {
    cursor: pointer;
  }
`;

export default React.memo(() => {

  const [tableNames, setTableNames] = useState([]);
  const [showDbConfigModal, setConfigModalState] = useState(false);

  useEffect( async () => {
    const result = await globalGetter('listAllTables')();
    setTableNames(result);
  }, [])

  const generateTableNameList = (arr) => {
    return arr.map((name, index) => {
      const uniqueId = `${index}_Db_Table_${name}`;
      return (
        <ListGroup.Item key={uniqueId} as="li" disabled>
          {name}
        </ListGroup.Item>
      );
    })
  }

  return (
    <LeftBar>
      <ConfigureHeader
        className={'list-group-item active'}
      >
        <a
          onClick={() => {
            console.log('123');
            setConfigModalState(true)
          }}
        >
          Database Config
        </a>
      </ConfigureHeader>
      <StyledGroupWrapper>
        <ListGroup as="ul" variant="flush">
          {generateTableNameList(tableNames)}
        </ListGroup>
      </StyledGroupWrapper>
      <DbSettingModal
        show={showDbConfigModal}
        hideModal={() => setConfigModalState(false)}
      />
    </LeftBar>
  );
});