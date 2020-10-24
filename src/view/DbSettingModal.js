import React, {useEffect, useState} from 'react';
import styled from "styled-components";
import Modal from "react-bootstrap/Modal";
import Table from "react-bootstrap/Table";
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";

const StyledTd = styled.td`
  width: 80px;
`;

export default React.memo((props) => {
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
                <Form.Control type="text" placeholder="db host url" />
              </td>
            </tr>
            <tr>
              <StyledTd>User: </StyledTd>
              <td>
                <Form.Control type="text" placeholder="username" />
              </td>
            </tr>
            <tr>
              <StyledTd>Password: </StyledTd>
              <td>
                <Form.Control type="password" placeholder="user password" />
              </td>
            </tr>
            <tr>
              <StyledTd>database: </StyledTd>
              <td>
                <Form.Control type="text" placeholder="database name" />
              </td>
            </tr>
            <tr>
              <StyledTd>Schema: </StyledTd>
              <td>
                <Form.Control type="text" placeholder="default is public" />
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
        <Button variant="primary">Save changes</Button>
      </Modal.Footer>
    </Modal>
  );
});