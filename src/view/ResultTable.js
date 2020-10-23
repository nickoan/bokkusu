import React from "react";
import Table from "react-bootstrap/Table";
import styled from "styled-components";

const TableArea = styled.div`
 width: 100%;
 height: calc(70vh - 54px);
 overflow: scroll;
`;

const Td = styled.td`
  min-width:50px;
  max-width:100px;
  overflow: scroll;
  white-space:nowrap;
`;

const Th = styled.th`
  min-width:80px;
  max-width:100px;
  overflow: scroll;
  white-space:nowrap;
`;

const formatter = (obj) => {
  if (obj instanceof Date) {
    return obj.toISOString();
  }

  if (obj === null || obj === undefined) {
    return '';
  }

  return obj.toString();
}

const generateTable = (result) => {
  const tHeads = result.fields.map(
    (field) => (<Th>{field.name.toString()}</Th>)
  );

  const tBodies = result.rows.map((row) => {
    const tmp = row.map((col) => {
      return (<Td>
        {formatter(col)}
      </Td>);
    });
    return (<tr>{tmp}</tr>);
  });

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          {tHeads}
        </tr>
      </thead>
      <tbody>
        {tBodies}
      </tbody>
    </Table>
  )
};

const sample= {
  fields: [{name: 'name1'}, {name: 'name2'}, {name: 'name3'}],
  rows:[
    ['123123124124124123124124125125125125141413', '456', '789'],
    ['123', '456', '789'],
    ['123', '456', '789'],
  ]
}

export default React.memo((props) => {
  const result = props.result || sample;
  return (
    <TableArea>
      {generateTable(result)}
    </TableArea>
  );
});