import React from "react";
import { Th, Table, Tbody, Thead, Tr } from "@chakra-ui/react";

interface Props {
  children: React.ReactNode;
}

export function MessagesList({ children }: Props) {
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>User</Th>
          <Th>Subject</Th>
          <Th>Date</Th>
          <Th>Action</Th>
        </Tr>
      </Thead>
      <Tbody>{children}</Tbody>
    </Table>
  );
}
