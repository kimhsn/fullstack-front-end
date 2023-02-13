import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Button,
  Image,
  Flex,
  ChakraProvider,
} from "@chakra-ui/react";

import * as ai from "react-icons/ai";
import * as fi from "react-icons/fi";

export default function ReadOnlyCardUser({ item, deleteShop, setIdShop }) {
  return (
    <ChakraProvider>
      <Center py={6}>
        <Box
          maxW={"435px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={18}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"370px"}
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
                {item.prenom} {item.nom}
              </Heading>
              <Text color={"gray.500"}>{item.email}</Text>
            </Stack>
            <Button
              w={"full"}
              mt={2}
              bgGradient="linear(to-r, blue.200,pink.200)"
              rounded={"full"}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
            >
              {item.appRoles[0].roleName}
            </Button>
            <Stack mt={5} direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <fi.FiEdit
                  cursor="pointer"
                  size={"37px"}
                  right={"0px"}
                  onClick={() => setIdShop(item.id)}
                  rounded={"full"}
                  color="#0000CD"
                />
              </Stack>
              <Stack spacing={0} align={"center"}>
                <ai.AiFillDelete
                  cursor="pointer"
                  size={"40px"}
                  right={"0px"}
                  onClick={() => deleteShop(item.id)}
                  rounded={"full"}
                  color="red"
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
}
