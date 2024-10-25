import {
  FormControl,
  FormLabel,
  Input,
  Center,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { z } from "zod";
import { useDispatch } from "react-redux";
import { nanoid } from "nanoid";

import { TaskSchema } from "../schema/TaskSchema";
import { addTask, Task } from "../slices/TaskSlice";

function Addtask() {
  const [name, setName] = useState<any>("");
  const [assignedBy, setAssignedBy] = useState<any>("");
  const [assignedTo, setAssignedTo] = useState<any>("");

  const [isEror, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = () => {
    const formData: Task = {
      name,
      assignedBy,
      assignedTo,
      id: nanoid(),
    };

    try {
      const parsedFormData = TaskSchema.parse(formData);
      setIsError(false);
      dispatch(addTask(parsedFormData));
      setName("");
      setAssignedBy("");
      setAssignedTo("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        if (error.issues[0].code === "too_small")
          setErrorMessage("Insufficient Data");
        else setErrorMessage("Unexpected Error Occuring");
        setIsError(true);
      } else {
        setErrorMessage("Unexpected Error Occuring");
        setIsError(true);
      }
    }
  };

  return (
    <>
      <Center h={"calc(100vh - 4rem)"}>
        <Flex w={700} paddingBottom={90}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <FormLabel>Assigned To</FormLabel>
            <Input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
            />

            <FormLabel>Assigned By</FormLabel>
            <Input
              type="text"
              value={assignedBy}
              onChange={(e) => setAssignedBy(e.target.value)}
            />
            <Flex justifyContent={"center"} padding={5}>
              {isEror && <Text color={"tomato"}>{errorMessage}</Text>}
            </Flex>

            <Flex justifyContent={"center"} padding={5}>
              <Button colorScheme="blue" onClick={handleSubmit}>
                {" "}
                Submit{" "}
              </Button>
            </Flex>
          </FormControl>
        </Flex>
      </Center>
    </>
  );
}

export default Addtask;
