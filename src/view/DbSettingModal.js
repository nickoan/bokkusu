import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import {cacheGetter, cacheSetter} from "./utils/localStorageCache";

const StyledTd = styled.td`
  width: 80px;
`;

const DEFAULT_DB_SETTING = {
  host: 'localhost',
  port: 5432,
  user: '',
  password: '',
  database: '',
  schema: 'public',
};

export const DB_STORE_KEY = 'BOKU_USER_DB_SETTING';
export default React.memo((props) => {

  const defaultSetting = cacheGetter(DB_STORE_KEY) || DEFAULT_DB_SETTING;
  const [dbInfos, setDbInfos] = useState(defaultSetting);

  const storeDbSettings = () => {
    cacheSetter(DB_STORE_KEY, dbInfos);
    props.refreshHandler();
    props.hideModal();
  }

  const onTargetChange = (key, defaultValue = '') => {
    return (event) => {
      const tmp = {};
      const value = event.target.value;
      tmp[`${key}`] = value || defaultValue;
      setDbInfos(Object.assign(dbInfos, tmp));
    }
  }

  return(
    <Modal show={props.show}>
      <Modal.Header>
        <Modal.Title>Database Setting</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Table responsive="sm">
          <tbody>
            <tr>
              <StyledTd>Host: </StyledTd>
              <td>
                <Form.Control
                  type="text"
                  placeholder={dbInfos.host}
                  onChange={onTargetChange('host', 'localhost')}
                />
              </td>
            </tr>
            <tr>
              <StyledTd>Port: </StyledTd>
              <td>
                <Form.Control
                  type="text"
                  placeholder={dbInfos.port}
                  onChange={onTargetChange('port', 5432)}
                />
              </td>
            </tr>
            <tr>
              <StyledTd>User: </StyledTd>
              <td>
                <Form.Control
                  type="text"
                  placeholder={dbInfos.user}
                  onChange={onTargetChange('user')}
                />
              </td>
            </tr>
            <tr>
              <StyledTd>Password: </StyledTd>
              <td>
                <Form.Control
                  type="password"
                  placeholder={dbInfos.password}
                  onChange={onTargetChange('password')}
                />
              </td>
            </tr>
            <tr>
              <StyledTd>database: </StyledTd>
              <td>
                <Form.Control
                  type="text"
                  placeholder={dbInfos.database}
                  onChange={onTargetChange('database')}
                />
              </td>
            </tr>
            <tr>
              <StyledTd>Schema: </StyledTd>
              <td>
                <Form.Control
                  type="text"
                  placeholder={dbInfos.schema}
                  onChange={onTargetChange('schema', 'public')}
                />
              </td>
            </tr>
          </tbody>
        </Table>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={props.hideModal}
        >Close
        </Button>
        <Button
          variant="primary"
          onClick={storeDbSettings}
        >
          Save changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
});