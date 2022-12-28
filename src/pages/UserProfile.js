import React, { useContext } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} pseudo={auth.pseudo}>
        <Center py={6}>
          <Box
            maxW={"500px"}
            w={"full"}
            bg={useColorModeValue("white", "gray.800")}
            boxShadow={"2xl"}
            rounded={"md"}
            overflow={"hidden"}
          >
            <Image
              h={"170px"}
              w={"full"}
              src={
                "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
              }
              objectFit={"cover"}
            />
            <Flex justify={"center"} mt={-12}>
              <Avatar
                size={"xl"}
                src={"https://cdn-icons-png.flaticon.com/512/428/428933.png"}
                alt={"Author"}
                css={{
                  border: "2px solid white",
                }}
              />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align={"center"} mb={5}>
                <Heading fontSize={"2xl"} fontWeight={500} fontFamily={"body"}>
                  {auth.nom} {auth.prenom}
                </Heading>
                <Text color={"gray.500"}> {auth.email}</Text>
              </Stack>

              <Stack
                direction={"row"}
                mt={"50px"}
                justify={"center"}
                spacing={20}
              >
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>Rôle</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    Admin
                  </Text>
                </Stack>{" "}
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}> Pseudo</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    {auth.pseudo}{" "}
                  </Text>
                </Stack>
              </Stack>

              <Button
                w={"full"}
                mt={14}
                bg={useColorModeValue("green.700", "gray.900")}
                color={"white"}
                rounded={"60px"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Changer les informations de mon compte
              </Button>
              <Button
                w={"full"}
                mt={4}
                bg={useColorModeValue("red.700", "gray.900")}
                color={"white"}
                rounded={"60px"}
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg",
                }}
              >
                Changer mon mot de passe
              </Button>
            </Box>
          </Box>
        </Center>
      </Sidebar>
    </ChakraProvider>
  );
};
export default UserProfile;
