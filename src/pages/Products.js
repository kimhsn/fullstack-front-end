import React, { useContext, useEffect, useState, Fragment } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import ReadOnlyProductCard from "../components/ReadOnlyProductCard";
import EditableProductCard from "../components/EditableProductCard";
import axios from "axios";
import {
  ChakraProvider,
  FormLabel,
  Grid,
  GridItem,
  Switch,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  Tab,
  TabList,
  Tabs,
  TabPanel,
  TabPanels,
  Flex,
  PopoverHeader,
  Button,
  Popover,
  PopoverTrigger,
  Input,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import PopupAddProduct from "../components/PopupAddProduct";
import * as fc from "react-icons/fc";
import Paginate from "../components/Paginate";
import { ChevronDownIcon } from "@chakra-ui/icons";
import "./Dashboard.css";

const URL = "http://localhost:8080/shops/produits";

export default function Products() {
  const { auth, setAuth } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [shops, setShops] = useState([]);
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = products.slice(indexOfFirstPost, indexOfLastPost);
  //pagination state
  const [idShop, setIdShop] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setproductDescription] = useState(null);
  const [productCode, setProductCode] = useState(null);
  // const [shopInVacation, setShopInVacation] = useState(false);

  //filtre+sort
  const [SortBy, setSortBy] = useState("");
  const [enConge, setEnConge] = useState("");
  const [dateBefore, setDateBefore] = useState("");
  const [dateAfter, setDateAfter] = useState("");
  const [productsInEN, setProductsInEN] = useState(false);
  const [value, setValue] = useState("1");
  const [errorPopup, setErrorPopup] = useState("");

  const [selectedShop, setSelectedShop] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const getProducts = async () => {
    const response = await axios.get(`http://localhost:8080/shops/produits`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setProducts(response.data);
  };

  const getShops = async () => {
    const response = await axios.get(`http://localhost:8080/shops/boutiques`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setShops(response.data);
  };
  const getCategories = async () => {
    const response = await axios.get(`http://localhost:8080/shops/categories`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setCategories(response.data);
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getShops();
  }, []);

  useEffect(() => {
    setErrorPopup("");
  }, [productName, productPrice]);

  const setTrue = async (id) => {
    setIdShop(id);
    const response = await axios.get(`${URL}/findById/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setNom(response.data.nom);
    setDescription(response.data.description);
    setProductPrice(response.data.prix);
  };

  const updateProduct = async (id) => {
    const response = await axios.put(
      `${URL}/${id}`,
      { prix: productPrice, nom: nom, description: description },
      {
        headers: { Authorization: `Bearer ${auth.accesToken}` },
      }
    );
    setIdShop(null);
    getProducts();
  };

  const deleteProduct = async (id) => {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    getProducts();
  };

  const searchProduct = async (name) => {
    let newproducts = [];
    const response = await axios.get(`${URL}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    response.data.map((shop) => {
      if (name.length == 0) {
        setProducts(response.data);
      } else if (name.length < 3) {
        setProducts([]);
      } else {
        if (shop.nom == name) {
          newproducts.unshift(shop);
        } else if (shop.nom.includes(name)) {
          newproducts.push(shop);
        }
        setProducts(newproducts);
      }
    });
  };
  const addProduct = async () => {
    if (productPrice === "" || productName === "") {
      setErrorPopup("Veuillez remplir tous les champs obligatoires");
      return false;
    } else if (isNaN(productPrice)) {
      setErrorPopup("Le prix doit être un nombre entier");
      return false;
    } else {
      const response = await fetch(`${URL}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${auth.accesToken}`,
          accept: "application/json", // It can be used to overcome cors errors
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          codeProduit: productCode,
          prix: productPrice,
          description: productDescription,
          nom: productName,
        }),
      });

      setProductCode(null);
      setProductName("");
      setProductPrice("");
      setIdShop(null);
      setproductDescription(null);
      getProducts();
      return true;
    }
  };
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const previousPage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage !== Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ChakraProvider>
      <Sidebar
        firstName={auth.prenom}
        lastName={auth.nom}
        role={auth.role}
        minH={"230vh"}
      >
        {auth.role == "ADMIN" || auth.role == "USER" ? (
          <PopupAddProduct
            setProductCode={setProductCode}
            errorPopup={errorPopup}
            setProductName={setProductName}
            addProduct={addProduct}
            setProductDescription={setproductDescription}
            setProductPrice={setProductPrice}
            setErrorPopup={setErrorPopup}
          />
        ) : null}
        <div className="wrapper">
          <div className="page-container">
            <FormLabel fontWeight={"bold"} ml={20} color="black" fontSize="31">
              Produits disponibles dans les boutiques
            </FormLabel>

            <FormLabel mt={10} ml={20} color="black" fontSize="18">
              Rechercher un produit
            </FormLabel>
            <InputGroup ml={20}>
              <Box
                borderLeftRadius={50}
                borderRightRadius={0}
                focusBorderColor={"#7B61FF"}
                borderColor={"#585AFC"}
                borderWidth={"4px"}
                height={"80px"}
                width={"100px"}
                bg={"#585AFC"}
                color={"white"}
                onClick={searchProduct}
              >
                <fc.FcSearch
                  style={{ marginLeft: "32px", marginTop: "14px" }}
                  size={"40px"}
                  color="red"
                />
              </Box>{" "}
              <Input
                borderColor={"#585AFC"}
                borderLeftRadius={0}
                borderRightRadius={50}
                borderWidth={"4px"}
                minWidth={"70px"}
                height={"80px"}
                width={"70%"}
                minwidth={"270px"}
                _hover={{
                  borderColor: "#7B61FF",
                }}
                placeholder="Entrez au moins 3 caractères pour rechercher"
                onChange={(e) => searchProduct(e.target.value)}
              />
            </InputGroup>
            <Grid mt={10} templateColumns="repeat(5, 1fr)">
              <GridItem></GridItem>{" "}
              <GridItem ml={"200px"}>
                {" "}
                <Flex
                  rounded={"200px"}
                  bgGradient="linear(to-r, blue.200,pink.200)"
                  placeholder="Trier par"
                  onChange={(e) => setSortBy(e.target.value)}
                  width={"220px"}
                  height={"40px"}
                >
                  <FormLabel mt={2} ml={4}>
                    Produits en anglais?{" "}
                  </FormLabel>{" "}
                  <Switch
                    mt={2}
                    onChange={() => setProductsInEN(!productsInEN)}
                  />
                </Flex>
              </GridItem>
              <GridItem ml={1}>
                {" "}
                <Flex justifyContent="center">
                  <Popover placement="bottom" isLazy>
                    <PopoverTrigger>
                      <Button
                        width={"185px"}
                        rounded={"200px"}
                        rightIcon={<ChevronDownIcon ml={14} />}
                        bgGradient="linear(to-r, blue.200,pink.200)"
                      >
                        Filtrer par
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent _focus={{ boxShadown: "none" }}>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader fontWeight="bold">
                        Filtrer par
                      </PopoverHeader>
                      <PopoverBody w="full">
                        <Tabs isLazy colorScheme="blue">
                          <TabList>
                            <Tab
                              _focus={{ boxShadow: "none" }}
                              fontSize="xs"
                              fontWeight="bold"
                              w="50%"
                            >
                              Nom de la Boutique
                            </Tab>
                            <Tab
                              _focus={{ boxShadow: "none" }}
                              fontSize="xs"
                              fontWeight="bold"
                              w="50%"
                            >
                              Nom de la catégorie
                            </Tab>
                          </TabList>
                          <TabPanels>
                            <TabPanel>
                              <div>
                                <input
                                  type="radio"
                                  name="shop"
                                  value=""
                                  onChange={(event) =>
                                    setSelectedShop(event.target.value)
                                  }
                                />
                                <label> Par défaut</label>
                              </div>
                              {shops.map((shop) => (
                                <div>
                                  <input
                                    type="radio"
                                    name="shop"
                                    value={shop.idBoutique}
                                    onChange={(event) =>
                                      setSelectedShop(event.target.value)
                                    }
                                  />
                                  <label> {shop.nom}</label>
                                </div>
                              ))}
                            </TabPanel>
                            <TabPanel>
                              <div>
                                <input
                                  type="radio"
                                  name="shop"
                                  value=""
                                  onChange={(event) =>
                                    setSelectedCategory(event.target.value)
                                  }
                                />
                                <label> Par défaut</label>
                              </div>
                              {categories.map((category) => (
                                <div>
                                  <input
                                    type="radio"
                                    name="shop"
                                    value={category.id}
                                    onChange={(event) =>
                                      setSelectedCategory(event.target.value)
                                    }
                                  />
                                  <label> {category.nom} </label>
                                </div>
                              ))}
                            </TabPanel>
                          </TabPanels>
                        </Tabs>
                      </PopoverBody>
                    </PopoverContent>
                  </Popover>
                </Flex>
              </GridItem>
            </Grid>

            <div className="cards">
              {products ? (
                currentProducts.map((element) => {
                  return (
                    <Fragment>
                      {idShop === element.id ? (
                        <EditableProductCard
                          item={element}
                          setIdShop={setIdShop}
                          setProductPrice={setProductPrice}
                          updateProduct={updateProduct}
                          setNom={setNom}
                          setDescription={setDescription}
                        />
                      ) : (
                        <ReadOnlyProductCard
                          item={element}
                          setIdShop={setTrue}
                          deleteProduct={deleteProduct}
                          role={auth.role}
                        />
                      )}{" "}
                    </Fragment>
                  );
                })
              ) : (
                <Fragment>
                  {/* 
                    <Box
                      maxW={"435px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                      h="300px"
                    >
                      <SkeletonText
                        mt="10"
                        noOfLines={6}
                        spacing="4"
                        skeletonHeight="2"
                      />

                      <SkeletonCircle mt="10" size="10" />
                    </Box>{" "}
                    <Box
                      maxW={"435px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                      h="300px"
                    >
                      <SkeletonText
                        mt="10"
                        noOfLines={6}
                        spacing="4"
                        skeletonHeight="2"
                      />

                      <SkeletonCircle mt="10" size="10" />
                    </Box>{" "}
                    <Box
                      maxW={"435px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                      h="300px"
                    >
                      <SkeletonText
                        mt="10"
                        noOfLines={6}
                        spacing="4"
                        skeletonHeight="2"
                      />

                      <SkeletonCircle mt="10" size="10" />
                    </Box>{" "}
                    <Box
                      maxW={"435px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                      h="300px"
                    >
                      <SkeletonText
                        mt="10"
                        noOfLines={6}
                        spacing="4"
                        skeletonHeight="2"
                      />

                      <SkeletonCircle mt="10" size="10" />
                    </Box>{" "}
                    <Box
                      maxW={"435px"}
                      w={"full"}
                      boxShadow={"2xl"}
                      rounded={"md"}
                      p={6}
                      overflow={"hidden"}
                      h="300px"
                    >
                      <SkeletonText
                        mt="10"
                        noOfLines={6}
                        spacing="4"
                        skeletonHeight="2"
                      />

                      <SkeletonCircle mt="10" size="10" />
                    </Box>
                    */}
                </Fragment>
              )}
            </div>
            {currentProducts.length > 0 && (
              <Paginate
                elementsPerPage={productsPerPage}
                totalElements={products.length}
                currentPage={currentPage}
                paginate={paginate}
                previousPage={previousPage}
                nextPage={nextPage}
              />
            )}
          </div>
        </div>
      </Sidebar>
    </ChakraProvider>
  );
}
