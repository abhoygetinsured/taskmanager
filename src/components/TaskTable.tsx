import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Box,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

import { RootState } from "../store";
import { Task } from "../slices/TaskSlice";

function TaskTable() {
  const taskList:Task[] = useSelector((state : RootState) => state.TaskList.tasks);

  return (
    <>
      <Box h={800} w={1000}>
        <TableContainer>
          <Table variant="simple">
            <TableCaption>These are very critical and Must do</TableCaption>
            <Thead>
              <Tr>
                <Th>Id</Th>
                <Th>Task</Th>
                <Th> Assigned To</Th>
                <Th> Assigned By</Th>
              </Tr>
            </Thead>
            <Tbody>

              {taskList.map((task:Task) => {
                return (
                  <Tr key={task.id}>
                  <Td>{task.id.toString()}</Td>
                  <Td>{task.name}</Td>
                  <Td>{task.assignedTo}</Td>
                  <Td>{task.assignedBy}</Td>
                </Tr>
                );
              })}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}

export default TaskTable;
