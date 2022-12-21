import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  FormLabel,
  useBreakpointValue,
  Icon,
  Link,
  Center,
  ChakraProvider,
} from "@chakra-ui/react";
import Devider from "../components/Devider";
import axios from "axios";
import Diamond from "../images/LogoBG.png";

const LOGIN_URL = "http://localhost:8080/user/findByMail";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  useEffect(() => {
    setErrMsg("");
  }, [email, password]);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(`${LOGIN_URL}/${email}`, {
        headers: { "Content-Type": "application/json" },
      });
      if (response?.data.mdp === password) {
        //console.log(response?.data.user.id);
        //console.log(email, password);
        let id = response?.data.user.id;
        let mail = response?.data.user.email;

        // setAuth({ id, mail });
        setEmail("");
        setPassword("");
        setSuccess(true);
      }
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized: Adresse email ou mot de passe incorrect !");
      } else {
        setErrMsg("Login Failed");
      }
      // errRef.current.focus();
    }
  };
  return (
    <>
      {success ? (
        <div />
      ) : (
        <>
          <ChakraProvider>
            <Box position={"relative"}>
              <Container
                as={SimpleGrid}
                maxW={"7xl"}
                columns={{ base: 1, md: 2 }}
                spacing={{ base: 10, lg: 32 }}
                py={{ base: 10, sm: 20, lg: 32 }}
              >
                <Stack spacing={{ base: 10, md: 20 }}>
                  <Heading
                    lineHeight={1.1}
                    fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                  >
                    Bienvenue sur market place
                    <Text
                      as={"span"}
                      bgGradient="linear(to-r, red.400,pink.400)"
                      bgClip="text"
                    >
                      &nbsp;!
                    </Text>
                    <br />
                  </Heading>
                  <Text
                    lineHeight={1.0}
                    fontSize={{ base: "3xl", sm: "4xl", md: "5xl", lg: "6xl" }}
                    as={"span"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    Une envie subite ? Régalez-vous de suite. Recherchez une
                    boutique, une catégorie ou un produit.
                  </Text>
                  <Stack direction={"row"} spacing={4} align={"center"}>
                    <section className="one-fourth" id="html">
                      <img src={Diamond} />
                    </section>

                    <Text
                      fontFamily={"heading"}
                      fontSize={{ base: "4xl", md: "6xl" }}
                    >
                      +
                    </Text>
                    <Flex
                      align={"center"}
                      justify={"center"}
                      fontFamily={"heading"}
                      fontSize={{ base: "sm", md: "lg" }}
                      bg={"gray.800"}
                      color={"white"}
                      rounded={"full"}
                      position={"relative"}
                      _before={{
                        content: '""',
                        width: "full",
                        height: "full",
                        rounded: "full",
                        transform: "scale(1.125)",
                        bgGradient: "linear(to-bl, orange.400,yellow.400)",
                        position: "absolute",
                        zIndex: -1,
                        top: 0,
                        left: 0,
                      }}
                    >
                      YOU
                    </Flex>
                  </Stack>
                </Stack>

                <Stack
                  bgGradient="linear(to-r, gray.300,gray.50)"
                  rounded={"xl"}
                  p={{ base: 4, sm: 6, md: 8 }}
                  spacing={{ base: 8 }}
                  maxW={{ lg: "lg" }}
                >
                  <Stack spacing={4}>
                    <Heading
                      color={"gray.800"}
                      lineHeight={1.1}
                      fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                    >
                      Connectez-vous à votre compte
                      <Text
                        as={"span"}
                        bgGradient="linear(to-r, red.400,pink.400)"
                        bgClip="text"
                      >
                        &nbsp;!
                      </Text>
                    </Heading>
                    <Text
                      color={"gray.500"}
                      fontSize={{ base: "sm", sm: "md" }}
                    >
                      Nous vous invitons à vous inscrire afin d'acceder à votre
                      espace personnel
                    </Text>
                  </Stack>
                  <Box as={"form"} mt={10}>
                    <Stack spacing={4}>
                      <Input
                        rounded={"200px"}
                        placeholder="Adresse email"
                        bgGradient="linear(to-r, gray.200 ,pink.100)"
                        border={0}
                        color={"gray.500"}
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                      <Input
                        rounded={"200px"}
                        placeholder="Mot de passe"
                        bgGradient="linear(to-r, gray.200 ,pink.100)"
                        border={0}
                        color={"gray.500"}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                      {errMsg && (
                        <FormLabel
                          color="red"
                          label={errMsg}
                          fontSize="xs"
                          mt="6"
                          mb="0"
                        />
                      )}
                      <Text
                        rounded={"200px"}
                        placeholder="+1 (___) __-___-___"
                        bgGradient="linear(to-r, gray.200 ,pink.100)"
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                      />
                    </Stack>
                    <Button
                      onClick={handleSubmit}
                      rounded={"200px"}
                      fontFamily={"heading"}
                      mt={8}
                      w={"full"}
                      bgGradient="linear(to-r, blue.400,pink.400)"
                      color={"white"}
                      _hover={{
                        bgGradient: "linear(to-r, red.400,pink.400)",
                        boxShadow: "xl",
                      }}
                    >
                      Se Connecter
                    </Button>
                    <Devider label="ou" />

                    <Center>
                      <Text
                        color={"gray.500"}
                        fontSize={{ base: "sm", sm: "md" }}
                      >
                        Pas de compte ? &emsp;
                      </Text>

                      <Link
                        href="http://localhost:4020/signup "
                        fontSize={{ base: "sm", sm: "md" }}
                        color={"blue.400"}
                      >
                        Inscrivez-vous
                      </Link>
                    </Center>
                  </Box>
                </Stack>
              </Container>
              <Blur
                position={"absolute"}
                top={-10}
                left={-10}
                style={{ filter: "blur(70px)" }}
              />
            </Box>
          </ChakraProvider>
        </>
      )}
    </>
  );
}

export const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: "100%", md: "40vw", lg: "30vw" })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" />
    </Icon>
  );
};
