import React, { useContext, useEffect, useState, Fragment } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import EditableCard from "../components/EditableCard";
import ReadOnlyCard from "../components/ReadOnlyCard";
import axios from "axios";
import {
  ChakraProvider,
  FormLabel,
  Input,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import "./Dashboard.css";
import PopupAddShop from "../components/PopupAddShop";
import * as fc from "react-icons/fc";
import Paginate from "../components/Paginate";
const URL = "http://localhost:8080/shops/boutiques";

export default function Dashboard() {
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

  const getData = async () => {
    const response = await axios.get(`${URL}/read`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setShops(response.data);
  };

  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + "T" + time;

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
    setConge(response.data.conge);
  };

  const updateShop = async (id) => {
    const response = axios.post(
      `${URL}/update/${id}`,
      JSON.stringify({
        nom: nom,
        description: description,
        creationData: creationData,
        horaire: horaire,
        conge: conge,
      }),
      {
        headers: { Authorization: `Bearer ${auth.accesToken}` },
      }
    );

    setIdShop(null);
    getData();
  };

  const deleteShop = async (id) => {
    const response = await axios.delete(`${URL}/delete/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    getData();
  };

  const searchShop = async (name) => {
    let newShops = [];
    const response = await axios.get(`${URL}/read`, {
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
    if (shopTime === "" || shopName === "") {
      setErrorPopup("Veuillez remplir tous les champs");
    } else {
      const response = await axios.post(
        `${URL}/create`,
        JSON.stringify({
          description: shopDescription,
          codeBoutique: shopCode,
          creationData: dateTime,
          nom: shopName,
          horaire: shopTime,
          conge: shopInVacation,
        }),
        {
          headers: { Authorization: `Bearer ${auth.accesToken}` },
        }
      );
      setIdShop(null);
      setShopDescription(null);
      setShopCode(null);

      setShopInVacation(false);

      getData();
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
        <PopupAddShop
          errorPopup={errorPopup}
          shopInVacation={shopInVacation}
          setShopName={setShopName}
          setShopTime={setShopTime}
          setShopInVacation={setShopInVacation}
          addShop={addShop}
          setShopCode={setShopCode}
          setShopDescription={setShopDescription}
        />

        <div className="wrapper">
          <div className="page-container">
            <ChakraProvider>
              <FormLabel
                fontWeight={"bold"}
                ml={20}
                color="black"
                fontSize="31"
              >
                Accueil
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
              <div className="cards">
                {shops ? (
                  currentShops.map((element) => {
                    return (
                      <Fragment>
                        {idShop === element.id ? (
                          <EditableCard
                            item={element}
                            setIdShop={setIdShop}
                            updateShop={updateShop}
                            setNom={setNom}
                            setDescription={setDescription}
                            setCodeBoutique={setCodeBoutique}
                            setCreationData={setCreationData}
                            setHoraire={setHoraire}
                          />
                        ) : (
                          <ReadOnlyCard
                            item={element}
                            setIdShop={setTrue}
                            deleteShop={deleteShop}
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
                shopsPerPage={shopsPerPage}
                totalShops={shops.length}
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
