import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import ListGroup from "react-bootstrap/ListGroup";
import globalGetter from "./utils/globalGetter";
import DbSettingModal, {DB_STORE_KEY} from "./DbSettingModal";
import {cacheGetter} from "./utils/localStorageCache";

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

  const refreshTablesHandler = async () => {
    const options = cacheGetter(DB_STORE_KEY);
    if (!options) {
      return;
    }
    const result = await globalGetter('listAllTables')(options);
    setTableNames(result);
  }
  useEffect( () => {
    refreshTablesHandler();
  }, []);

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
        refreshHandler={refreshTablesHandler}
      />
    </LeftBar>
  );
});