import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import StatsShop from "../components/StatsShop";
import AuthContext from "./context/AuthProvider";
import { Badge, Center, Link } from "@chakra-ui/react";
import {
  Box,
  Container,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Button,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
} from "@chakra-ui/react";
import detailsShop from "../images/detailsShop.jpg";
import axios from "axios";
import { TiShoppingCart } from "react-icons/ti";

const URL = "http://localhost:8080/shops/categories/findById";

const DetailsCategory = () => {
  const [categoryName, setCategoryName] = useState("");
  const [productsTotal, setProductsTotal] = useState(0);
  const [categoriesTotal, setCategoriesTotal] = useState(0);
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [shop, setShop] = useState("");
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    const response = await axios.get(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setShop(response.data);
    setProducts(response.data.produits);
    setProductsTotal(response.data.produits.length);
  };
  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} role={auth.role}>
        <Container maxW={"7xl"}>
          <SimpleGrid
            columns={{ base: 1, lg: 2 }}
            spacing={{ base: 8, md: 10 }}
            py={{ base: 18, md: 24 }}
          >
            <Flex>
              <Image
                rounded={"md"}
                alt={"product image"}
                src={detailsShop}
                fit={"cover"}
                align={"center"}
                w={"100%"}
                h={{ base: "100%", sm: "400px", lg: "500px" }}
              />
            </Flex>
            <Stack spacing={{ base: 6, md: 10 }}>
              <Box as={"header"}>
                <Heading
                  lineHeight={1.1}
                  fontWeight={600}
                  fontSize={{ base: "2xl", sm: "4xl", lg: "5xl" }}
                  mr={"auto"}
                >
                  {shop.nom}
                </Heading>
              </Box>

              <Stack
                spacing={{ base: 4, sm: 6 }}
                direction={"column"}
                divider={
                  <StackDivider
                    borderColor={useColorModeValue("gray.200", "gray.600")}
                  />
                }
              >
                <VStack spacing={{ base: 4, sm: 6 }}>
                  <Text
                    color={useColorModeValue("gray.500", "gray.400")}
                    fontSize={"2xl"}
                    fontWeight={"300"}
                    mr={"auto"}
                  >
                    {shop.description}
                  </Text>
                  <Box
                    maxW="7xl"
                    mx={"auto"}
                    pt={2}
                    px={{ base: 2, sm: 12, md: 17 }}
                  >
                    <SimpleGrid
                      columns={{ base: 1, md: 3 }}
                      spacing={{ base: 5, lg: 8 }}
                    >
                      <StatsShop
                        title={"Produits"}
                        stat={productsTotal}
                        icon={<TiShoppingCart size={"3em"} />}
                      />
                    </SimpleGrid>
                  </Box>
                </VStack>

                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"#898afc"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Produits de la categorie
                  </Text>
                  <Box overflowY="auto" maxHeight="740px" maxWidth="700px">
                    {products &&
                      products.map((item) => (
                        <Center py={6}>
                          <Stack
                            borderWidth="1px"
                            borderRadius="lg"
                            w={{ sm: "100%", md: "540px" }}
                            height={{ sm: "476px", md: "20rem" }}
                            direction={{ base: "column", md: "row" }}
                            bg={"white"}
                            boxShadow={"2xl"}
                            padding={4}
                          >
                            <Flex flex={1} bg="blue.200">
                              <Image
                                objectFit="cover"
                                boxSize="100%"
                                src={item.urlPhoto}
                              />
                            </Flex>

                            <Stack
                              flex={1}
                              flexDirection="column"
                              justifyContent="center"
                              alignItems="center"
                              p={1}
                              pt={2}
                            >
                              <Heading fontSize={"2xl"} fontFamily={"body"}>
                                {item.nom}
                              </Heading>
                              <Badge
                                px={2}
                                py={1}
                                // bg={useColorModeValue("gray.50", "gray.800")}
                                fontWeight={"400"}
                              >
                                {item.codeProduit}
                              </Badge>
                              <Text
                                textAlign={"center"}
                                //color={useColorModeValue("gray.700", "gray.400")}
                                px={3}
                              >
                                {item.description}
                              </Text>

                              <Stack
                                width={"100%"}
                                mt={"2rem"}
                                direction={"row"}
                                padding={2}
                                justifyContent={"space-between"}
                                alignItems={"center"}
                              >
                                <Flex
                                  fontSize={"sm"}
                                  rounded={"full"}
                                  _focus={{
                                    bg: "white",
                                  }}
                                ></Flex>
                                <Button
                                  flex={1}
                                  fontSize={"sm"}
                                  rounded={"full"}
                                  bg={"blue.400"}
                                  color={"white"}
                                  boxShadow={
                                    "0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)"
                                  }
                                  _hover={{
                                    bg: "blue.500",
                                  }}
                                  _focus={{
                                    bg: "blue.500",
                                  }}
                                >
                                  <Text color="white" fontSize="2xl">
                                    {item.prix}€
                                  </Text>
                                </Button>
                              </Stack>
                            </Stack>
                          </Stack>
                        </Center>
                      ))}
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </SimpleGrid>
        </Container>
      </Sidebar>
    </ChakraProvider>
  );
};
export default DetailsCategory;
