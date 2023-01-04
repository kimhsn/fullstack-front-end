import {
  Box,
  Center,
  Text,
  Stack,
  Image,
  GridItem,
  ChakraProvider,
  Input,
  Tooltip,
  Icon,
  chakra,
} from "@chakra-ui/react";
import * as ai from "react-icons/ai";
import * as tb from "react-icons/tb";
import { FiShoppingCart } from "react-icons/fi";

import Logo from "../images/Product2.png";

export default function EditableProductCard({
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
            <Stack mt={4} direction={"row"} spacing={4} align={"center"}>
              <Stack
                direction={"column"}
                width={"100%"}
                spacing={0}
                fontSize={"sm"}
              >
                <Tooltip
                  label="Produit en stock"
                  bg="white"
                  placement={"top"}
                  color={"gray.800"}
                  fontSize={"1.2em"}
                >
                  <chakra.a href={"#"} display={"flex"}>
                    <Icon
                      color={"blue.600"}
                      as={FiShoppingCart}
                      h={7}
                      w={7}
                      alignSelf={"center"}
                    />
                  </chakra.a>
                </Tooltip>
                <Text color="blue.600" fontSize="2xl">
                  {item.prix}€
                </Text>
              </Stack>

              <ai.AiFillCheckCircle
                cursor="pointer"
                color={"green"}
                size={"40px"}
                right={"0px"}
                onClick={() => updateShop(item.id)}
                rounded={"full"}
              />
              <tb.TbArrowBack
                cursor="pointer"
                size={"40px"}
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
