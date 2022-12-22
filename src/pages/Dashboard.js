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
  Button,
  InputGroup,
} from "@chakra-ui/react";
import "./Dashboard.css";

const URL = "http://localhost:8080/shpos/boutique";

export default function Dashboard() {
  const { auth, setAuth } = useContext(AuthContext);
  const [shops, setShops] = useState([]);
  const [idShop, setIdShop] = useState(null);
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [codeBoutique, setCodeBoutique] = useState("");
  const [creationData, setCreationData] = useState("");
  const [horaire, setHoraire] = useState("");
  const [conge, setConge] = useState("");

  const getData = async () => {
    const response = await axios.get(`${URL}/read`);
    setShops(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const setTrue = async (id) => {
    setIdShop(id);
    const response = await axios.get(`${URL}/findById/${id}`);
    setNom(Response.data.nom);
    setDescription(Response.data.description);
    setCodeBoutique(Response.data.codeBoutique);
    setCreationData(Response.data.creationData);
    setHoraire(Response.data.horaire);
    setConge(Response.data.conge);
  };

  const updateShop = async (id) => {
    const response = await axios.put(
      `${URL}/update/${id}`,
      JSON.stringify({
        nom: nom,
        description: description,
        codeBoutique: codeBoutique,
        creationData: creationData,
        horaire: horaire,
        conge: conge,
      }),
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setIdShop(null);
    getData();
  };
  const deleteShop = async (id) => {
    const response = await axios.delete(`${URL}/delete/${id}`, {
      headers: { "Content-Type": "application/json" },
    });
    getData();
  };
  return (
    <ChakraProvider>
      <Sidebar firstName={auth.prenom} lastName={auth.nom} pseudo={auth.pseudo}>
        <div className="wrapper">
          <div className="page-container">
            <ChakraProvider>
              <FormLabel
                fontWeight={"bold"}
                mt={14}
                ml={20}
                color="black"
                fontSize="31"
              >
                Accueil
              </FormLabel>

              <FormLabel mt={20} ml={20} color="black" fontSize="18">
                Rechercher une boutique
              </FormLabel>
              <InputGroup className="searchinput">
                <Input
                  borderColor={"#585AFC"}
                  borderLeftRadius={10}
                  borderRightRadius={0}
                  borderWidth={"4px"}
                  minWidth={"70px"}
                  height={"80px"}
                  width={"62%"}
                  minwidth={"270px"}
                  ml={20}
                  placeholder="Mot clé"
                />
                <Input
                  borderRightRadius={0}
                  borderLeftRadius={0}
                  height={"80px"}
                  borderColor={"#585AFC"}
                  borderWidth={"4px"}
                  width={"276px"}
                  name="location_id"
                  placeholder="Pays"
                />
                <Button
                  borderLeftRadius={0}
                  borderRightRadius={10}
                  focusBorderColor={"#7B61FF"}
                  borderColor={"#585AFC"}
                  borderWidth={"4px"}
                  height={"80px"}
                  width={"100px"}
                  bg={"#6578f4"}
                  searchData
                  color={"white"}
                  _hover={{
                    bg: "#7B61FF",
                  }}
                  _focus={{
                    bg: "#7B61FF",
                  }}
                >
                  GO
                </Button>
              </InputGroup>
              <div className="cards">
                {shops &&
                  shops.map((element) => {
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
                        )}
                      </Fragment>
                    );
                  })}
              </div>
            </ChakraProvider>
          </div>
        </div>
      </Sidebar>
    </ChakraProvider>
  );
}
