import React, { useContext, useEffect, useState, Fragment } from "react";
import { useParams } from "react-router-dom";
import { ChakraProvider } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import ReadOnlyRow from "../components/ReadOnlyRows";
import StatsShop from "../components/StatsShop";
import AuthContext from "./context/AuthProvider";
import {
  Box,
  Container,
  GridItem,
  Stack,
  Text,
  Image,
  Flex,
  VStack,
  Heading,
  SimpleGrid,
  StackDivider,
  useColorModeValue,
  Square,
  Thead,
  Tbody,
  Tr,
  Th,
  Table,
  FormLabel,
  TableContainer,
} from "@chakra-ui/react";
import detailsShop from "../images/detailsShop.jpg";
import { MdLocalShipping } from "react-icons/md";
import axios from "axios";
import { BiCategory } from "react-icons/bi";
import { TiShoppingCart } from "react-icons/ti";
const URL = "http://localhost:8080/shops/boutiques/findById";

const DetailsShop = () => {
  const [categoryName, setCategoryName] = useState({});
  const [productsTotal, setProductsTotal] = useState(0);
  const [categoriesTotal, setCategoriesTotal] = useState(0);
  const [productsOfCategory, setProductsOfCategory] = useState([]);
  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState("");
  const [item, setItem] = useState("");
  const [productCount, setProductCount] = useState(0);
  const [shop, setShop] = useState("");
  const [deMatinLundi, setDeMatinLundi] = useState("");
  const [àMatinLundi, setÀMatinLundi] = useState("");
  const [deaprèsmidiLundi, setDeaprèsmidiLundi] = useState("");
  const [àaprèsmidiLundi, setÀaprèsmidiLundi] = useState("");
  const [deMatinMardi, setDeMatinMardi] = useState("");
  const [àMatinMardi, setÀMatinMardi] = useState("");
  const [deaprèsmidiMardi, setDeaprèsmidiMardi] = useState("");
  const [àaprèsmidiMardi, setÀaprèsmidiMardi] = useState("");
  const [deMatinMercredi, setDeMatinMercredi] = useState("");
  const [àMatinMercredi, setÀMatinMercredi] = useState("");
  const [deaprèsmidiMercredi, setDeaprèsmidiMercredi] = useState("");
  const [àaprèsmidiMercredi, setÀaprèsmidiMercredi] = useState("");
  const [deMatinJeudi, setDeMatinJeudi] = useState("");
  const [àMatinJeudi, setÀMatinJeudi] = useState("");
  const [deaprèsmidiJeudi, setDeaprèsmidiJeudi] = useState("");
  const [àaprèsmidiJeudi, setÀaprèsmidiJeudi] = useState("");
  const [deMatinVendredi, setDeMatinVendredi] = useState("");
  const [àMatinVendredi, setÀMatinVendredi] = useState("");
  const [deaprèsmidiVendredi, setDeaprèsmidiVendredi] = useState("");
  const [àaprèsmidiVendredi, setÀaprèsmidiVendredi] = useState("");

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axios.get(`${URL}/${id}`);
    setItem(response.data);
    setShop(response.data);
    setCategories(response.data.categories);
    setProducts(response.data.produits);
    const parser = JSON.parse(response.data.horaire);
    const deMatinLundi = parser.lundi.matin.de;
    const àMatinLundi = parser.lundi.matin.à;
    const deaprèsmidiLundi = parser.lundi.aprèsmidi.de;
    const àaprèsmidiLundi = parser.lundi.aprèsmidi.à;
    const deMatinMardi = parser.mardi.matin.de;
    const àMatinMardi = parser.mardi.matin.à;
    const deaprèsmidiMardi = parser.mardi.aprèsmidi.de;
    const àaprèsmidiMardi = parser.mardi.aprèsmidi.à;
    const deMatinMercredi = parser.mercredi.matin.de;
    const àMatinMercredi = parser.mercredi.matin.à;
    const deaprèsmidiMercredi = parser.mercredi.aprèsmidi.de;
    const àaprèsmidiMercredi = parser.mercredi.aprèsmidi.à;
    const deMatinJeudi = parser.jeudi.matin.de;
    const àMatinJeudi = parser.jeudi.matin.à;
    const deaprèsmidiJeudi = parser.jeudi.aprèsmidi.de;
    const àaprèsmidiJeudi = parser.jeudi.aprèsmidi.à;
    const deMatinVendredi = parser.vendredi.matin.de;
    const àMatinVendredi = parser.vendredi.matin.à;
    const deaprèsmidiVendredi = parser.vendredi.aprèsmidi.de;
    const àaprèsmidiVendredi = parser.vendredi.aprèsmidi.à;
    setDeMatinLundi(deMatinLundi);
    setÀMatinLundi(àMatinLundi);
    setDeaprèsmidiLundi(deaprèsmidiLundi);
    setÀaprèsmidiLundi(àaprèsmidiLundi);
    setDeMatinMardi(deMatinMardi);
    setÀMatinMardi(àMatinMardi);
    setDeaprèsmidiMardi(deaprèsmidiMardi);
    setÀaprèsmidiMardi(àaprèsmidiMardi);
    setDeMatinMercredi(deMatinMercredi);
    setÀMatinMercredi(àMatinMercredi);
    setDeaprèsmidiMercredi(deaprèsmidiMercredi);
    setÀaprèsmidiMercredi(àaprèsmidiMercredi);
    setDeMatinJeudi(deMatinJeudi);
    setÀMatinJeudi(àMatinJeudi);
    setDeaprèsmidiJeudi(deaprèsmidiJeudi);
    setÀaprèsmidiJeudi(àaprèsmidiJeudi);
    setDeMatinVendredi(deMatinVendredi);
    setÀMatinVendredi(àMatinVendredi);
    setDeaprèsmidiVendredi(deaprèsmidiVendredi);
    setÀaprèsmidiVendredi(àaprèsmidiVendredi);
  };
  const renderHeader = () => {
    let headerElements = ["Nom", "Prix", "Code produit", "Description"];
    return headerElements.map((key, index) => {
      return <Th key={index}>{key} </Th>;
    });
  };
  const renderBody = () => {
    return (
      productsOfCategory &&
      productsOfCategory.map((key) => {
        return (
          <Fragment>
            <ReadOnlyRow product={key} />
          </Fragment>
        );
      })
    );
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
                {shop.conge == true ? (
                  <Text
                    alignItems="center"
                    justifyContent={"center"}
                    color={"red.500"}
                    textTransform={"uppercase"}
                    fontWeight={800}
                    fontSize={"sm"}
                  >
                    <Stack direction="row" alignItems="center">
                      <MdLocalShipping />
                      <Text>En congés</Text>
                    </Stack>
                  </Text>
                ) : (
                  <Text
                    alignItems="center"
                    justifyContent={"center"}
                    color={"green.500"}
                    textTransform={"uppercase"}
                    fontWeight={800}
                    fontSize={"sm"}
                    letterSpacing={1.1}
                  >
                    <Stack direction="row" alignItems="center">
                      <MdLocalShipping />
                      <Text>En activité</Text>
                    </Stack>
                  </Text>
                )}
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
                        title={"Catégories"}
                        stat={categories.length}
                        icon={<BiCategory size={"3em"} />}
                      />

                      <StatsShop
                        title={"Produits"}
                        stat={products.length}
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
                    Horraires d'ouverture
                  </Text>

                  <Square marginRight={"400px"}>
                    <Box>
                      <Text fontWeight="bold">Lundi</Text>
                      <Box>
                        <Text as="span" mr="2">
                          Matin :
                        </Text>
                        <Text as="span">
                          {deMatinLundi} - {àMatinLundi}
                        </Text>
                      </Box>
                      <Box mb={1}>
                        <Text as="span" mr="2">
                          Après-midi :
                        </Text>
                        <Text as="span">
                          {deaprèsmidiLundi} - {àaprèsmidiLundi}
                        </Text>
                      </Box>
                      <Text fontWeight="bold">Mardi</Text>
                      <Box>
                        <Text as="span" mr="2">
                          Matin :
                        </Text>
                        <Text as="span">
                          {deMatinMardi} - {àMatinMardi}{" "}
                        </Text>
                      </Box>
                      <Box mb={1}>
                        <Text as="span" mr="2">
                          Après-midi :
                        </Text>
                        <Text as="span">
                          {deaprèsmidiMardi} - {àaprèsmidiMardi}{" "}
                        </Text>
                      </Box>
                      <Text fontWeight="bold">Mercredi</Text>
                      <Box>
                        <Text as="span" mr="2">
                          Matin :
                        </Text>
                        <Text as="span">
                          {deMatinMercredi} - {àMatinMercredi}{" "}
                        </Text>
                      </Box>
                      <Box mb={1}>
                        <Text as="span" mr="2">
                          Après-midi :
                        </Text>
                        <Text as="span">
                          {deaprèsmidiMercredi} - {àaprèsmidiMercredi}{" "}
                        </Text>
                      </Box>
                      <Text fontWeight="bold">Jeudi</Text>
                      <Box>
                        <Text as="span" mr="2">
                          Matin :
                        </Text>
                        <Text as="span">
                          {deMatinJeudi} - {àMatinJeudi}{" "}
                        </Text>
                      </Box>
                      <Box mb={1}>
                        <Text as="span" mr="2">
                          Après-midi :
                        </Text>
                        <Text as="span">
                          {deaprèsmidiJeudi} - {àaprèsmidiJeudi}{" "}
                        </Text>
                      </Box>
                      <Text fontWeight="bold">Vendredi</Text>
                      <Box>
                        <Text as="span" mr="2">
                          Matin :
                        </Text>
                        <Text as="span">
                          {deMatinVendredi} - {àMatinVendredi}{" "}
                        </Text>
                      </Box>
                      <Box mb={1}>
                        <Text as="span" mr="2">
                          Après-midi :
                        </Text>
                        <Text as="span">
                          {deaprèsmidiVendredi} - {àaprèsmidiVendredi}{" "}
                        </Text>
                      </Box>
                    </Box>
                  </Square>
                </Box>
                <Box>
                  <Text
                    fontSize={{ base: "16px", lg: "18px" }}
                    color={"#898afc"}
                    fontWeight={"500"}
                    textTransform={"uppercase"}
                    mb={"4"}
                  >
                    Catégories de la boutique
                  </Text>
                  <SimpleGrid columns={{ base: 1, md: 2 }} spacing={14}>
                    {categories &&
                      categories.map((item) => (
                        <GridItem key={item}>
                          <Box
                            borderColor={"#585AFC"}
                            borderWidth={"4px"}
                            p={8}
                            w="300px"
                            rounded="md"
                            bg={
                              item.nom === categoryName ? "#D1D2FF" : "#898afc"
                            }
                            key={item}
                            borderRadius={10}
                            cursor="pointer"
                            onClick={() => {
                              setCategory(item);
                              setCategoryName(item.nom);

                              setProductsOfCategory(item.produits);
                            }}
                          >
                            <Stack align={"center"}>
                              <Text
                                fontSize={"30px"}
                                fontWeight={"extrabold"}
                                fontFamily={"nunito"}
                                color={
                                  item.nom === categoryName
                                    ? "darkblue"
                                    : "white"
                                }
                              >
                                {item.nom}
                              </Text>
                            </Stack>
                          </Box>
                        </GridItem>
                      ))}
                  </SimpleGrid>
                </Box>
              </Stack>
              {productsOfCategory.length > 0 && (
                <Box
                  bg={"white"}
                  w="600px"
                  h="550px"
                  mt={10}
                  ml={20}
                  px={20}
                  py={10}
                >
                  <FormLabel color="#4f4e69" fontSize="24">
                    <b>Les produits de la category {category.nom}</b>
                  </FormLabel>
                  <TableContainer>
                    <Box overflowY="auto" maxHeight="550px" maxWidth="700px">
                      <Table variant="striped" colorScheme="blue">
                        <Thead position="sticky" top={0}>
                          <Tr>{renderHeader()}</Tr>
                        </Thead>
                        <Tbody>{renderBody()}</Tbody>
                      </Table>
                    </Box>
                  </TableContainer>
                </Box>
              )}
            </Stack>
          </SimpleGrid>
        </Container>
      </Sidebar>
    </ChakraProvider>
  );
};
export default DetailsShop;
