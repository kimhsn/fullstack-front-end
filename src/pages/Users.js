import React, { useContext, useEffect, useState, Fragment } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";
import {
  ChakraProvider,
  FormLabel,
  Input,
  Box,
  InputGroup,
} from "@chakra-ui/react";
import EditableCardUser from "../components/EditableCardUser";
import ReadOnlyCardUser from "../components/ReadOnlyCardUser";
import "./Dashboard.css";
import PopupAddUser from "../components/PopupAddUser";
import * as fc from "react-icons/fc";
import axios from "axios";
import Paginate from "../components/Paginate";

const URL = "http://localhost:8080/shops/users";

export default function Users() {
  const { auth, setAuth } = useContext(AuthContext);

  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(6);
  const indexOfLastPost = currentPage * usersPerPage;
  const indexOfFirstPost = indexOfLastPost - usersPerPage;
  const currentusers = users.slice(indexOfFirstPost, indexOfLastPost);
  //pagination state
  const [idShop, setIdShop] = useState(null);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userMDP, setUserMDP] = useState(null);

  const [errorPopup, setErrorPopup] = useState("");

  const getData = async () => {
    const response = await axios.get(`${URL}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setUsers(response.data);
  };

  useEffect(() => {
    setErrorPopup("");
  }, [userFirstName]);

  useEffect(() => {
    getData();
  }, []);

  const setTrue = async (id) => {
    setIdShop(id);
    const response = await axios.get(`${URL}/findById/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setNom(response.data.nom);
    setPrenom(response.data.prenom);
    setEmail(response.data.email);
  };

  const updateUser = async (id) => {
    const response = await axios.put(
      `${URL}/${id}`,
      {
        nom: nom,
        prenom: prenom,
        email: email,
      },
      {
        headers: {
          Authorization: `Bearer ${auth.accesToken}`,
        },
      }
    );
    await axios.post(
      `${URL}/changeRole`,
      {
        email: email,
        roleName: role,
      },
      {
        headers: { Authorization: `Bearer ${auth.accesToken}` },
      }
    );

    setIdShop(null);
    getData();
  };

  const deleteUser = async (id) => {
    const response = await axios.delete(`${URL}/${id}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    getData();
  };

  const searchUser = async (name) => {
    let newusers = [];
    const response = await axios.get(`${URL}`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    response.data.map((shop) => {
      if (name.length == 0) {
        setUsers(response.data);
      } else if (name.length < 3) {
        setUsers([]);
      } else {
        if (shop.prenom == name) {
          newusers.unshift(shop);
        } else if (shop.nom.includes(name)) {
          newusers.push(shop);
        }

        setUsers(newusers);
      }
    });
  };
  const addUser = async () => {
    if (
      userFirstName === " " ||
      userLastName === " " ||
      userEmail === "" ||
      userMDP === "" ||
      userRole === ""
    ) {
      setErrorPopup("Veuillez remplir tous les champs");
      return false;
    } else {
      userRole === "ADMIN"
        ? await axios.post(
            `${URL}/addNewAdmin`,
            {
              prenom: userLastName,
              nom: userFirstName,
              email: userEmail,
              mdp: userMDP,
            },
            {
              headers: { Authorization: `Bearer ${auth.accesToken}` },
            }
          )
        : await axios.post(
            `${URL}/addNewManager`,
            {
              prenom: userLastName,
              nom: userFirstName,
              email: userEmail,
              mdp: userMDP,
            },
            {
              headers: { Authorization: `Bearer ${auth.accesToken}` },
            }
          );

      const response = setIdShop(null);
      setUserLastName(null);

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
    if (currentPage !== Math.ceil(users.length / usersPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} role={auth.role}>
        <PopupAddUser
          setUserMDP={setUserMDP}
          errorPopup={errorPopup}
          setUserFirstName={setUserFirstName}
          addUser={addUser}
          setUserLastName={setUserLastName}
          setUserEmail={setUserEmail}
          setUserRole={setUserRole}
          setErrorPopup={setErrorPopup}
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
                Utilisateurs disponibles
              </FormLabel>

              <FormLabel mt={10} ml={20} color="black" fontSize="18">
                Rechercher un utilisateur par prenom
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

                  //onClick={searchUser}
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
                  onChange={(e) => searchUser(e.target.value)}
                />
              </InputGroup>

              <div className="cards">
                {users ? (
                  currentusers.map((element) => {
                    return (
                      <Fragment>
                        {idShop === element.id ? (
                          <EditableCardUser
                            item={element}
                            setIdShop={setIdShop}
                            updateUser={updateUser}
                            setNom={setNom}
                            setPrenom={setPrenom}
                            setEmail={setEmail}
                            setRole={setRole}
                            setUserRole={setUserRole}
                          />
                        ) : (
                          <ReadOnlyCardUser
                            item={element}
                            setIdShop={setTrue}
                            deleteUser={deleteUser}
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
            {currentusers.length > 0 && (
              <Paginate
                elementsPerPage={usersPerPage}
                totalElements={users.length}
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
