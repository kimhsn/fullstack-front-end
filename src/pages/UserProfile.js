import React, { useContext, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import axios from "axios";
import {
  Heading,
  Avatar,
  Box,
  Input,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
} from "@chakra-ui/react";
import UserProfileLogo from "../images/UserProfileLogo.jpg";

const URL = "http://localhost:8080/shops/users";

const UserProfile = () => {
  const { auth } = useContext(AuthContext);
  const [isClicked, setIsClicked] = useState(false);
  const [firstName, setFirstName] = useState(auth.prenom);
  const [lastName, setLastName] = useState(auth.nom);
  const [email, setEmail] = useState(auth.email);
  const updateUser = async (id) => {
    const response = await axios.put(
      `${URL}/update/${id}`,
      {
        nom: lastName,
        prenom: firstName,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accesToken}`,
        },
      }
    );
    setEmail(response.data.email);
    setFirstName(response.data.prenom);
    setLastName(response.data.nom);
  };
  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} role={auth.role}>
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
                src={UserProfileLogo}
                alt={"Author"}
                css={{
                  border: "2px solid white",
                }}
              />
            </Flex>

            <Box p={6}>
              <Stack spacing={0} align={"center"} mb={5}>
                {isClicked ? (
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    <Flex>
                      {" "}
                      <Input
                        ml={7}
                        width="80px"
                        border={0}
                        size={0}
                        focusBorderColor={"transparent"}
                        placeholder={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                      />{" "}
                      <Input
                        ml={3}
                        border={0}
                        size={0}
                        width="80px"
                        focusBorderColor={"transparent"}
                        placeholder={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        style={{ fontWeight: "bold", fontSize: "24px" }}
                      />{" "}
                    </Flex>
                  </Heading>
                ) : (
                  <Heading
                    fontSize={"2xl"}
                    fontWeight={500}
                    fontFamily={"body"}
                  >
                    {firstName} {lastName}
                  </Heading>
                )}
              </Stack>

              <Stack
                direction={"row"}
                mt={"50px"}
                justify={"center"}
                spacing={20}
              >
                {" "}
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}> Email</Text>
                  {isClicked ? (
                    <Input
                      mr={20}
                      fontSize={"sm"}
                      color={"gray.500"}
                      width="120px"
                      border={0}
                      size={0}
                      focusBorderColor={"transparent"}
                      placeholder={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  ) : (
                    <Text fontSize={"sm"} color={"gray.500"}>
                      {email}{" "}
                    </Text>
                  )}
                </Stack>
                <Stack spacing={0} align={"center"}>
                  <Text fontWeight={600}>Rôle</Text>
                  <Text fontSize={"sm"} color={"gray.500"}>
                    Admin
                  </Text>
                </Stack>{" "}
              </Stack>
              {isClicked ? (
                <Button
                  w={"full"}
                  mt={14}
                  bg={"blue.700"}
                  color={"white"}
                  rounded={"60px"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => {
                    setIsClicked(!isClicked);
                    updateUser(auth.id);
                  }}
                >
                  Valider les modifications
                </Button>
              ) : (
                <Button
                  w={"full"}
                  mt={14}
                  bg={"green.700"}
                  color={"white"}
                  rounded={"60px"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => {
                    setIsClicked(!isClicked);
                  }}
                >
                  Changer les informations de mon compte
                </Button>
              )}
              {isClicked ? (
                <Button
                  w={"full"}
                  mt={4}
                  bg={"red.700"}
                  color={"white"}
                  rounded={"60px"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                  onClick={() => {
                    setIsClicked(!isClicked);
                    updateUser(auth.id);
                  }}
                >
                  Annuler{" "}
                </Button>
              ) : (
                <Button
                  w={"full"}
                  mt={4}
                  bg={"red.700"}
                  color={"white"}
                  rounded={"60px"}
                  _hover={{
                    transform: "translateY(-2px)",
                    boxShadow: "lg",
                  }}
                >
                  Changer mon mot de passe
                </Button>
              )}
            </Box>
          </Box>
        </Center>
      </Sidebar>
    </ChakraProvider>
  );
};
export default UserProfile;
