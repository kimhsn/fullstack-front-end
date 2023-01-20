import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Grid,
  Image,
  GridItem,
  chakra,
  Tooltip,
  Flex,
  ChakraProvider,
  Icon,
} from "@chakra-ui/react";
import { FiShoppingCart } from "react-icons/fi";

import * as ai from "react-icons/ai";
import * as fi from "react-icons/fi";
import { Link } from "react-router-dom";

export default function ReadOnlyProductCard({
  item,
  deleteProduct,
  setIdShop,
}) {
  return (
    <ChakraProvider>
      <GridItem key={item.id}>
        <Center py={6} cursor="pointer">
          <Box
            maxW={"435px"}
            bg={"white"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
          >
            <Link to={`/detailsshop/${item.id}`}>
              <Box
                h={"210px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={80}
                pos={"relative"}
              >
                <Image
                  h={"500px"}
                  w={"500px"}
                  src={item.urlPhoto}
                  layout={"fill"}
                />
              </Box>{" "}
              <Grid templateColumns="repeat(1, 1fr)">
                <Stack>
                  <Heading fontSize={"2xl"} fontFamily={"body"}>
                    {item.nom}
                  </Heading>
                </Stack>
              </Grid>
              <Stack>
                <Text marginTop={3} color={"gray.500"}>
                  {item.description}
                </Text>
              </Stack>
            </Link>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Link to={`/detailsshop/${item.id}`}>
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
              </Link>{" "}
              <Stack
                direction={"column"}
                spacing={0}
                width={"100%"}
                fontSize={"sm"}
              >
                <Link to={`/detailsshop/${item.id}`}>
                  <Text fontWeight={600}>{item.codeBoutique}</Text>
                  <Text color={"gray.500"}>{item.creationData}</Text>
                </Link>{" "}
              </Stack>
              {/*<PopupAssignation />*/}
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
                onClick={() => deleteProduct(item.id)}
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
const Feature = ({ title, icon }) => {
  return (
    <Stack>
      <Flex w={10} ml={10} h={8}>
        {icon}
      </Flex>
      <Text position={"relative"} top={0} left={"50px"} fontWeight={600}>
        {title}
      </Text>{" "}
    </Stack>
  );
};
