import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  Image,
  GridItem,
  Switch,
  ChakraProvider,
  Input,
} from "@chakra-ui/react";
import * as ai from "react-icons/ai";
import * as tb from "react-icons/tb";

import Logo from "../images/a.jpg";

export default function EditableCard({
  item,
  updateShop,
  setIdShop,
  setCodeBoutique,
  setNom,
  setDescription,
  setCreationData,
  setInVacations,
}) {
  return (
    <ChakraProvider>
      <GridItem key={item.id}>
        <Center py={6} cursor="pointer">
          <Box
            maxW={"435px"}
            w={"full"}
            // bg={useColorModeValue("white", "gray.900")}
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
                  color={"green.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  {" "}
                  En activité ?
                  <Switch
                    colorScheme="green"
                    ml={4}
                    onChange={() => setInVacations(!item.conge)}
                  />
                </Text>
              ) : (
                <Text
                  color={"red.500"}
                  textTransform={"uppercase"}
                  fontWeight={800}
                  fontSize={"sm"}
                  letterSpacing={1.1}
                >
                  En congé ?
                  <Switch
                    colorScheme="red"
                    ml={4}
                    onChange={() => setInVacations(!item.conge)}
                  />
                </Text>
              )}

              <Input
                border={0}
                size={0}
                focusBorderColor={"transparent"}
                placeholder={item.nom}
                onChange={(e) => setNom(e.target.value)}
                style={{ fontWeight: "bold", fontSize: "24px" }}
              />

              <Input
                border={0}
                size={0}
                focusBorderColor={"transparent"}
                onChange={(e) => setDescription(e.target.value)}
                placeholder={item.description}
              />
            </Stack>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Avatar
                src={"https://avatars0.githubusercontent.com/u/1164541?v=4"}
                alt={"Author"}
              />
              <Stack
                direction={"column"}
                width={"100%"}
                spacing={0}
                fontSize={"sm"}
              >
                <Input
                  border={0}
                  size={0}
                  focusBorderColor={"transparent"}
                  placeholder={item.codeBoutique}
                  setCodeBoutique={(e) => setCodeBoutique(e.target.value)}
                />
                <Input
                  border={0}
                  size={0}
                  focusBorderColor={"transparent"}
                  placeholder={item.creationData}
                  setCreationData={(e) => setCreationData(e.target.value)}
                />
              </Stack>

              <ai.AiFillCheckCircle
                cursor="pointer"
                color={"green"}
                size={"60px"}
                right={"0px"}
                onClick={() => updateShop(item.id)}
                rounded={"full"}
              />
              <tb.TbArrowBack
                cursor="pointer"
                size={"60px"}
                right={"0px"}
                onClick={() => setIdShop(null)}
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
