import React, { useContext, useEffect, useState, Fragment } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import EditableCard from "../components/EditableCard";
import ReadOnlyCard from "../components/ReadOnlyCard";
import Devider from "../components/Devider";
import axios from "axios";
import {
  ChakraProvider,
  FormLabel,
  FormControl,
  Grid,
  GridItem,
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
  Select,
  Input,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import "./Dashboard.css";
import { ChevronDownIcon } from "@chakra-ui/icons";
import PopupAddShop from "../components/PopupAddShop";
import * as fc from "react-icons/fc";
import Paginate from "../components/Paginate";

const URL = "http://localhost:8080/shops/boutiques";

export default function Shops() {
  const { auth, setAuth } = useContext(AuthContext);

  const [shops, setShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [shopsPerPage] = useState(6);
  const indexOfLastPost = currentPage * shopsPerPage;
  const indexOfFirstPost = indexOfLastPost - shopsPerPage;
  const currentShops = shops.slice(indexOfFirstPost, indexOfLastPost);
  //pagination state
  const [idShop, setIdShop] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [codeBoutique, setCodeBoutique] = useState("");
  const [creationData, setCreationData] = useState("");
  const [horaire, setHoraire] = useState("");
  const [conge, setConge] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopTime, setShopTime] = useState("");
  const [shopDescription, setShopDescription] = useState(null);
  const [shopCode, setShopCode] = useState(null);
  const [shopInVacation, setShopInVacation] = useState(false);
  const [errorPopup, setErrorPopup] = useState("");
  const [inVacations, setInVacations] = useState("");
  //filtre+sort
  const [SortBy, setSortBy] = useState("");
  const [enConge, setEnConge] = useState("");
  const [dateBefore, setDateBefore] = useState("");
  const [dateAfter, setDateAfter] = useState("");

  //horraires d'ouverture de la boutique
  const [mondayMorningFrom, setMondayMorningFrom] = useState("");
  const [mondayMorningTo, setMondayMorningTo] = useState("");
  const [mondayAfternoonFrom, setMondayAfternoonFrom] = useState("");
  const [mondayAfternoonTo, setMondayAfternoonTo] = useState("");
  const [tuesdayMorningFrom, setTuesdayMorningFrom] = useState("");
  const [tuesdayMorningTo, setTuesdayMorningTo] = useState("");
  const [tuesdayAfternoonFrom, setTuesdayAfternoonFrom] = useState("");
  const [tuesdayAfternoonTo, setTuesdayAfternoonTo] = useState("");
  const [wednesdayMorningFrom, setWednesdayMorningFrom] = useState("");
  const [wednesdayMorningTo, setWednesdayMorningTo] = useState("");
  const [wednesdayAfternoonFrom, setWednesdayAfternoonFrom] = useState("");
  const [wednesdayAfternoonTo, setWednesdayAfternoonTo] = useState("");
  const [thursdayMorningFrom, setThursdayMorningFrom] = useState("");
  const [thursdayMorningTo, setThursdayMorningTo] = useState("");
  const [thursdayAfternoonFrom, setThursdayAfternoonFrom] = useState("");
  const [thursdayAfternoonTo, setThursdayAfternoonTo] = useState("");
  const [fridayMorningFrom, setFridayMorningFrom] = useState("");
  const [fridayMorningTo, setFridayMorningTo] = useState("");
  const [fridayAfternoonFrom, setFridayAfternoonFrom] = useState("");
  const [fridayAfternoonTo, setFridayAfternoonTo] = useState("");

  let horaiere = {
    lundi: [
      { from: "08:00", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
    mardi: [
      { from: "08:00", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
    mercredi: [
      { from: "08:00", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
    jeudi: [
      { from: "08:00", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
    vendredi: [
      { from: "08:00", to: "12:00" },
      { from: "14:00", to: "18:00" },
    ],
    samedi: [
      { from: "10:00", to: "12:00" },
      { from: "14:00", to: "19:00" },
    ],
  };
  const getData = async () => {
    const response = await axios.get(
      `${URL}?sort=${SortBy}&conge=${enConge}&dateAfter=${dateAfter}&dateBefore=${dateBefore}`
    );
    setShops(response.data);
  };

  useEffect(() => {
    if (dateAfter == "//" || dateBefore == "//") {
      setDateAfter("");
      setDateBefore("");
    }
    getData();
  }, [SortBy, enConge, dateBefore, dateAfter]);
  useEffect(() => {
    setErrorPopup("");
  }, [shopName, shopTime]);

  const setTrue = async (id) => {
    setIdShop(id);
    const response = await axios.get(`${URL}/findById/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setNom(response.data.nom);
    setDescription(response.data.description);
    setCodeBoutique(response.data.codeBoutique);
    setCreationData(response.data.creationData);
    setHoraire(response.data.horaire);
    setInVacations(response.data.conge);
  };

  const updateShop = async (id) => {
    const response = await axios.put(
      `${URL}/${id}`,
      {
        nom: nom,
        description: description,
        horaire: horaire,
        conge: inVacations,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accesToken}`,
        },
      }
    );

    setIdShop(null);
    getData();
  };

  const deleteShop = async (id) => {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    getData();
  };

  const searchShop = async (name) => {
    let newShops = [];
    const response = await axios.get(
      `${URL}?sort=${SortBy}&conge=${enConge}&dateAfter=${dateAfter}&dateBefore=${dateBefore}`,
      {
        headers: { Authorization: `Bearer ${auth.accesToken}` },
      }
    );
    response.data.map((shop) => {
      if (name.length == 0) {
        setShops(response.data);
      } else if (name.length < 3) {
        setShops([]);
      } else {
        if (shop.nom == name) {
          newShops.unshift(shop);
        } else if (shop.nom.includes(name)) {
          newShops.push(shop);
        }

        setShops(newShops);
      }
    });
  };
  const addShop = async () => {
    if (shopName === "") {
      setErrorPopup("Veuillez remplir tous les champs requis");
      return false;
    } else {
      const jsonStringHours = JSON.stringify({
        lundi: {
          matin: { de: mondayMorningFrom, à: mondayMorningTo },
          aprèsmidi: { de: mondayAfternoonFrom, à: mondayAfternoonTo },
        },
        mardi: {
          matin: { de: tuesdayMorningFrom, à: tuesdayMorningTo },
          aprèsmidi: { de: tuesdayAfternoonFrom, à: tuesdayAfternoonTo },
        },
        mercredi: {
          matin: { de: wednesdayMorningFrom, à: wednesdayMorningTo },
          aprèsmidi: {
            de: wednesdayAfternoonFrom,
            à: wednesdayAfternoonTo,
          },
        },
        jeudi: {
          matin: { de: thursdayMorningFrom, à: thursdayMorningTo },
          aprèsmidi: { de: thursdayAfternoonFrom, à: thursdayAfternoonTo },
        },
        vendredi: {
          matin: { de: fridayMorningFrom, à: fridayMorningTo },
          aprèsmidi: { de: fridayAfternoonFrom, à: fridayAfternoonTo },
        },
      });
      const response = await axios.post(
        `${URL}`,
        {
          description: shopDescription,
          nom: shopName,
          conge: shopInVacation,
          horaires: jsonStringHours,
        },
        {
          headers: { Authorization: `Bearer ${auth.accesToken}` },
        }
      );
      setIdShop(null);
      setShopDescription(null);
      setShopCode(null);

      setShopInVacation(false);

      getData();
      console.log({
        description: shopDescription,
        nom: shopName,
        conge: shopInVacation,
        user: auth.prenom + " " + auth.nom,
        horaires: jsonStringHours,
      });
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
    if (currentPage !== Math.ceil(shops.length / shopsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} role={auth.role}>
        {auth.role == "ADMIN" || auth.role == "VENDEUR_LIVREUR" ? (
          <PopupAddShop
            setErrorPopup={setErrorPopup}
            errorPopup={errorPopup}
            shopInVacation={shopInVacation}
            setShopName={setShopName}
            setShopTime={setShopTime}
            setShopInVacation={setShopInVacation}
            addShop={addShop}
            setShopCode={setShopCode}
            setShopDescription={setShopDescription}
            setMondayAfternoonFrom={setMondayAfternoonFrom}
            setMondayAfternoonTo={setMondayAfternoonTo}
            setMondayMorningFrom={setMondayMorningFrom}
            setMondayMorningTo={setMondayMorningTo}
            setTuesdayAfternoonFrom={setTuesdayAfternoonFrom}
            setTuesdayAfternoonTo={setTuesdayAfternoonTo}
            setTuesdayMorningFrom={setTuesdayMorningFrom}
            setTuesdayMorningTo={setTuesdayMorningTo}
            setWednesdayAfternoonFrom={setWednesdayAfternoonFrom}
            setWednesdayAfternoonTo={setWednesdayAfternoonTo}
            setWednesdayMorningFrom={setWednesdayMorningFrom}
            setWednesdayMorningTo={setWednesdayMorningTo}
            setThursdayAfternoonFrom={setThursdayAfternoonFrom}
            setThursdayAfternoonTo={setThursdayAfternoonTo}
            setThursdayMorningFrom={setThursdayMorningFrom}
            setThursdayMorningTo={setThursdayMorningTo}
            setFridayAfternoonFrom={setFridayAfternoonFrom}
            setFridayAfternoonTo={setFridayAfternoonTo}
            setFridayMorningFrom={setFridayMorningFrom}
            setFridayMorningTo={setFridayMorningTo}
          />
        ) : null}
        <div className="wrapper">
          <div className="page-container">
            <ChakraProvider>
              <FormLabel
                fontWeight={"bold"}
                ml={20}
                color="black"
                fontSize="31"
              >
                Boutiques disponibles
              </FormLabel>

              <FormLabel mt={10} ml={20} color="black" fontSize="18">
                Rechercher une boutique
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

                  //onClick={searchShop}
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
                  onChange={(e) => searchShop(e.target.value)}
                />
              </InputGroup>
              <Grid mt={10} templateColumns="repeat(5, 1fr)">
                <GridItem colSpan={3}></GridItem>
                <GridItem ml={20}>
                  {" "}
                  <Select
                    rounded={"200px"}
                    bgGradient="linear(to-r, blue.200,pink.200)"
                    placeholder="Trier par"
                    onChange={(e) => setSortBy(e.target.value)}
                    width={"185px"}
                  >
                    <option value="nom">Nom</option>
                    <option value="creationDate">Date de création</option>
                    <option value="nbProduits">Nombre de produit</option>
                  </Select>
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
                          <Tabs isLazy colorScheme="green">
                            <TabList>
                              <Tab
                                _focus={{ boxShadow: "none" }}
                                fontSize="xs"
                                fontWeight="bold"
                                w="50%"
                              >
                                Type de boutique
                              </Tab>
                              <Tab
                                _focus={{ boxShadow: "none" }}
                                fontSize="xs"
                                fontWeight="bold"
                                w="50%"
                              >
                                Date de création
                              </Tab>
                            </TabList>
                            <TabPanels>
                              <TabPanel>
                                <FormControl display="flex" alignItems="center">
                                  <FormLabel htmlFor="email-alerts" mb="0">
                                    Boutiques en congé?
                                  </FormLabel>
                                  <Select
                                    rounded={"200px"}
                                    bgGradient="linear(to-r, blue.200,pink.200)"
                                    placeholder="Type"
                                    onChange={(e) => setEnConge(e.target.value)}
                                    width={"95px"}
                                  >
                                    <option value="true">En congé</option>
                                    <option value="false">En activité</option>
                                  </Select>
                                </FormControl>
                              </TabPanel>
                              <TabPanel>
                                <FormLabel htmlFor="email-alerts" mb="0">
                                  Avant une date précise
                                </FormLabel>
                                <Input
                                  placeholder="Select Date and Time"
                                  size="md"
                                  type="date"
                                  onChange={(e) => {
                                    const [year, month, day] =
                                      e.target.value.split("-");

                                    const db = [day, month, year].join("/");
                                    setDateBefore(db);
                                  }}
                                />
                                <Devider label="-" />
                                <FormLabel htmlFor="email-alerts" mb="0">
                                  Aprés une date précise
                                </FormLabel>
                                <Input
                                  placeholder="Select Date and Time"
                                  size="md"
                                  type="date"
                                  onChange={(e) => {
                                    const [year, month, day] =
                                      e.target.value.split("-");

                                    const db = [day, month, year].join("/");
                                    setDateAfter(db);
                                  }}
                                />
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
                {shops ? (
                  currentShops.map((element) => {
                    return (
                      <Fragment>
                        {idShop === element.idBoutique ? (
                          <EditableCard
                            item={element}
                            setIdShop={setIdShop}
                            updateShop={updateShop}
                            setNom={setNom}
                            setDescription={setDescription}
                            setCodeBoutique={setCodeBoutique}
                            setCreationData={setCreationData}
                            setHoraire={setHoraire}
                            setEnConge={setEnConge}
                            setInVacations={setInVacations}
                          />
                        ) : (
                          <ReadOnlyCard
                            item={element}
                            setIdShop={setTrue}
                            deleteShop={deleteShop}
                            role={auth.role}
                            idUserAuth={auth.id}
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
            </ChakraProvider>
            {currentShops.length > 0 && (
              <Paginate
                elementsPerPage={shopsPerPage}
                totalElements={shops.length}
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
