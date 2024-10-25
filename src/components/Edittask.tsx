import React, { useState } from "react";
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
  Center,
  Flex,
  Input,
  Textarea,
  Text,
} from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { EditIcon, DeleteIcon, CheckCircleIcon } from "@chakra-ui/icons";
import { z } from "zod";

import { RootState } from "../store";
import { Task, editTask, deleteTask } from "../slices/TaskSlice";
import { TaskSchema } from "../schema/TaskSchema";

function Edittask() {
  const [isEditing, setIsEditing] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [name, setName] = useState<any>("");
  const [assignedBy, setAssignedBy] = useState<any>("");
  const [assignedTo, setAssignedTo] = useState<any>("");

  const dispatch = useDispatch();
  const taskList: Task[] = useSelector(
    (state: RootState) => state.TaskList.tasks
  );

  return (
    <>
      <Center h={"calc(100vh - 4rem)"}>
        <Box h={800} w={1000}>
          {isError && <Text>{errorMessage}</Text>}
          <TableContainer>
            <Table variant="simple">
              <TableCaption>These are very critical and Must do</TableCaption>
              <Thead>
                <Tr>
                  <Th>Id</Th>
                  <Th>Task</Th>
                  <Th> Assigned To</Th>
                  <Th> Assigned By</Th>
                  <Th>Actions</Th>
                </Tr>
              </Thead>
              <Tbody>
                {taskList.map((task: Task) => {
                  return (
                    <Tr key={task.id}>
                      <Td>{task.id.toString()}</Td>

                      <Td
                        maxWidth="380px"
                        whiteSpace="normal"
                        overflow="hidden"
                      >
                        {isEditing && editingId === task.id ? (
                          <Textarea
                            w="350px"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                          />
                        ) : (
                          task.name
                        )}
                      </Td>
                      <Td>
                        {" "}
                        {isEditing && editingId === task.id ? (
                          <Input
                            value={assignedTo}
                            onChange={(e) => setAssignedTo(e.target.value)}
                          />
                        ) : (
                          task.assignedTo
                        )}
                      </Td>
                      <Td>
                        {" "}
                        {isEditing && editingId === task.id ? (
                          <Input
                            value={assignedBy}
                            onChange={(e) => setAssignedBy(e.target.value)}
                          />
                        ) : (
                          task.assignedBy
                        )}
                      </Td>
                      <Td>
                        <Flex>
                          {isEditing && editingId === task.id ? (
                            <CheckCircleIcon
                              boxSize={5}
                              marginRight={2}
                              cursor={"pointer"}
                              onClick={() => {
                                const formData = {
                                  id: task.id,
                                  name,
                                  assignedTo,
                                  assignedBy,
                                };
                                try {
                                  const parsedFormData =
                                    TaskSchema.parse(formData);
                                  setIsError(false);
                                  dispatch(editTask(parsedFormData));

                                  setName("");
                                  setAssignedBy("");
                                  setAssignedTo("");

                                  setIsEditing(false);
                                  setEditingId("");
                                } catch (error) {
                                  if (error instanceof z.ZodError) {
                                    if (error.issues[0].code === "too_small")
                                      setErrorMessage("Insufficient Data");
                                    else
                                      setErrorMessage(
                                        "Unexpected Error Occuring"
                                      );
                                    setIsError(true);
                                  } else {
                                    setErrorMessage(
                                      "Unexpected Error Occuring"
                                    );
                                    setIsError(true);
                                  }
                                }
                              }}
                            />
                          ) : (
                            <EditIcon
                              boxSize={5}
                              marginRight={2}
                              cursor={"pointer"}
                              onClick={() => {
                                setName(task.name);
                                setAssignedTo(task.assignedTo);
                                setAssignedBy(task.assignedBy);

                                setEditingId(task.id);
                                setIsEditing(true);
                              }}
                            />
                          )}

                          <DeleteIcon
                            boxSize={5}
                            marginLeft={2}
                            cursor={"pointer"}
                            onClick={() => {
                              dispatch(deleteTask({id:task.id}));
                            }}
                          />
                        </Flex>
                      </Td>
                    </Tr>
                  );
                })}
              </Tbody>
            </Table>
          </TableContainer>
        </Box>
      </Center>
    </>
  );
}

export default Edittask;
