import React, { useContext, useState, Fragment, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import ReadOnlyCardCategory from "../components/ReadOnlyCardCategory";
import EditableCategoryCard from "../components/EditableCategoryCard";
import axios from "axios";
import {
  Input,
  ChakraProvider,
  FormLabel,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import PopupAddCategory from "../components/PopupAddCategory";
import * as fc from "react-icons/fc";
import Paginate from "../components/Paginate";
import "./Dashboard.css";

const URL = "http://localhost:8080/shops/categories";

export default function Categories() {
  const { auth, setAuth } = useContext(AuthContext);

  const [shops, setShops] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [elementsPerPage] = useState(6);
  const indexOfLastPost = currentPage * elementsPerPage;
  const indexOfFirstPost = indexOfLastPost - elementsPerPage;
  const currentCategories = shops.slice(indexOfFirstPost, indexOfLastPost);

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

  const getData = async () => {
    const response = await axios.get(`${URL}`);

    let categoriesFiltered = response.data.filter(function (category) {
      return category.nom !== "Plus de produits";
    });
    setShops(categoriesFiltered);
  };

  useEffect(() => {
    getData();
  }, []);
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

  const updateCategory = async (id) => {
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

  const deleteCategory = async (id) => {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    getData();
  };

  const searchShop = async (name) => {
    let newShops = [];
    const response = await axios.get(`${URL}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
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
      setErrorPopup("Veuillez remplir tous les champs");
      return false;
    } else {
      const response = await axios.post(
        `${URL}`,
        {
          description: shopDescription,
          nom: shopName,
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
    if (currentPage !== Math.ceil(shops.length / elementsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} role={auth.role}>
        {auth.role == "ADMIN" ? (
          <PopupAddCategory
            setErrorPopup={setErrorPopup}
            errorPopup={errorPopup}
            setShopName={setShopName}
            setShopInVacation={setShopInVacation}
            addShop={addShop}
            setShopCode={setShopCode}
            setShopDescription={setShopDescription}
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
                Catégories disponibles
              </FormLabel>

              <FormLabel mt={10} ml={20} color="black" fontSize="18">
                Rechercher une catégorie
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

              <div className="cards">
                {shops ? (
                  currentCategories.map((element) => {
                    return (
                      <Fragment>
                        {idShop === element.id ? (
                          <EditableCategoryCard
                            item={element}
                            setIdShop={setIdShop}
                            updateCategory={updateCategory}
                            setNom={setNom}
                            setDescription={setDescription}
                            setCodeBoutique={setCodeBoutique}
                            setCreationData={setCreationData}
                          />
                        ) : (
                          element.nom != "Plus de produits" && (
                            <ReadOnlyCardCategory
                              getCategories={getData}
                              item={element}
                              setIdShop={setTrue}
                              deleteCategory={deleteCategory}
                              role={auth.role}
                            />
                          )
                        )}
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
            {currentCategories.length > 0 && (
              <Paginate
                elementsPerPage={elementsPerPage}
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
