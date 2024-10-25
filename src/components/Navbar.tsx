import {
  Box,
  Flex,
  HStack,
  Button,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { changeDir } from "../slices/Navslice";
import { Link } from "react-router-dom";

interface linkobject {
  name: string;
  link: string;
}

// Define the links array
const Links: linkobject[] = [
  {
    name: "Home",
    link: "/",
  },
  {
    name: "Add",
    link: "/add",
  },
  {
    name: "Edit",
    link: "/edit",
  },
];

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navValue = useSelector((state: RootState) => state.NavData.value);

  const NavLink: React.FC<{ linkObj: linkobject }> = ({ linkObj }) => (
    <Link to={linkObj.link}>
      <Button
        colorScheme="blue"
        variant={navValue === linkObj.name ? "solid" : "ghost"}
        onClick={() => dispatch(changeDir({ dir: linkObj.name }))}
      >
        {linkObj.name}
      </Button>
    </Link>
  );

  return (
    <>
      <Box bg="white" px={4}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          {/* Hamburger/Close icon for small screens */}
          <Box
            display={{ base: "block", md: "none" }}
            onClick={isOpen ? onClose : onOpen}
            fontSize="2xl"
            color="white"
            cursor="pointer"
          >
            {isOpen ? "✖" : "☰"}
          </Box>

          {/* Centering the links */}
          <Flex flex={1} justifyContent="center">
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((linkObj) => (
                <NavLink key={linkObj.name} linkObj={linkObj} />
              ))}
            </HStack>
          </Flex>
        </Flex>

        {/* Mobile menu for small screens */}
        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((linkObj) => (
                <NavLink key={linkObj.name} linkObj={linkObj} />
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>
    </>
  );
};

export default Navbar;
