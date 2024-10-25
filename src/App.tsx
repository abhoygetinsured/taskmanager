import React from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Box } from "@chakra-ui/react";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Addtask from "./components/Addtask";
import Edittask from "./components/Edittask";
function App() {
  return (
    <>
      <Navbar />
      <Box>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/add" element={<Addtask />} />
          <Route path="/edit" element={<Edittask />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;