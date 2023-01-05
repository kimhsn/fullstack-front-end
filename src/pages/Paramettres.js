import { ChakraProvider } from "@chakra-ui/react";
import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import { Input } from "@chakra-ui/react";
export default function Paramettres() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log("test");

  return (
    <ChakraProvider>
      <Input />
    </ChakraProvider>
  );
}
