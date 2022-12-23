import {
  Box,
  Center,
  Text,
  Stack,
  Avatar,
  Image,
  GridItem,
  IconButton,
  ChakraProvider,
  Input,
} from "@chakra-ui/react";
import * as gr from "react-icons/gr";
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
}) {
  return (
    <ChakraProvider>
      <GridItem key={item.id}>
        <Center py={6}>
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
              <Stack direction={"column"} spacing={0} fontSize={"sm"}>
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
              <IconButton
                left={"108px"}
                onClick={() => setIdShop(null)}
                rounded={"full"}
                colorScheme="red"
                icon={<tb.TbArrowBack />}
              />
              <IconButton
                left={"0px"}
                onClick={() => updateShop(item.id)}
                rounded={"full"}
                colorScheme="green"
                icon={<gr.GrStatusGood />}
              />
            </Stack>
          </Box>
        </Center>
      </GridItem>
    </ChakraProvider>
  );
}
