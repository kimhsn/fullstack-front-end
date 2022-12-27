import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Image,
  GridItem,
  ChakraProvider,
} from "@chakra-ui/react";
import PopupAssignation from "./PopupAssignation";
import * as ai from "react-icons/ai";
import * as fi from "react-icons/fi";
import Logo from "../images/a.jpg";

export default function ReadOnlyCard({ item, deleteShop, setIdShop }) {
  return (
    <ChakraProvider>
      <GridItem key={item.id}>
        <Center py={6} cursor="pointer">
          <Box
            maxW={"435px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
          >
            <Box
              h={"210px"}
              bg={"gray.100"}
              mt={-6}
              mx={-6}
              mb={6}
              pos={"relative"}
            >
              <Image src={Logo} layout={"fill"} />
            </Box>
            <Stack>
              {item.conge == true ? (
                <Text
                  color={"red.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  En congé
                </Text>
              ) : (
                <Text
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  En activité
                </Text>
              )}
              <Heading fontSize={"2xl"} fontFamily={"body"}>
                {item.nom}
              </Heading>
              <Text color={"gray.500"}>{item.description}</Text>
            </Stack>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Avatar
                src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                alt={"Author"}
              />
              <Stack
                direction={"column"}
                spacing={0}
                width={"100%"}
                fontSize={"sm"}
              >
                <Text fontWeight={600}>{item.codeBoutique}</Text>
                <Text color={"gray.500"}>{item.creationData}</Text>
              </Stack>{" "}
              <PopupAssignation />
              <fi.FiEdit
                cursor="pointer"
                size={"60px"}
                right={"0px"}
                onClick={() => setIdShop(item.id)}
                rounded={"full"}
                color="#0000CD"
              />
              <ai.AiFillDelete
                cursor="pointer"
                size={"60px"}
                right={"0px"}
                onClick={() => deleteShop(item.id)}
                rounded={"full"}
                color="red"
              />
            </Stack>
          </Box>
        </Center>
      </GridItem>
    </ChakraProvider>
  );
}
