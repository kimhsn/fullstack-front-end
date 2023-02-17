import React, { useRef, useState, useContext, useEffect } from "react";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialog,
  Button,
  AlertDialogFooter,
  ChakraProvider,
  useDisclosure,
  Select,
} from "@chakra-ui/react";
import * as ri from "react-icons/ri";
import axios from "axios";
import "./PopupAddShop.css";
import AuthContext from "../pages/context/AuthProvider";

export default function PopupAssignationUserToShop({ idBoutique, getShop }) {
  const { auth, setAuth } = useContext(AuthContext);

  const [userEmail, setUserEmail] = useState("");
  const [users, setUsers] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const getUsers = async () => {
    const response = await axios.get(`http://localhost:8080/shops/users`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setUsers(response.data);
    onOpen();
  };

  const assignProductToShop = async () => {
    const response = await axios.post(
      `http://localhost:8080/shops/boutiques/addUserToBoutique?emailUser=${userEmail}&idBoutique=${idBoutique}`,
      {
        idBoutique: idBoutique,
        emailUser: userEmail,
      },
      {
        headers: { Authorization: `Bearer ${auth.accesToken}` },
      }
    );
    getShop();
  };

  return (
    <ChakraProvider>
      <ri.RiUserReceived2Fill
        cursor="pointer"
        size={"60px"}
        marginRight={0}
        right={"0px"}
        rounded={"full"}
        color={"purple"}
        onClick={getUsers}
      />
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>
            Assigner un utilisateur à cette boutique ?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Veuillez selectionnez l'utilisateur que vous souhaitez assigner à
            cette boutique.
            <Select
              mt={"15px"}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              placeholder="Utilisateur à assigner"
              onChange={(e) => setUserEmail(e.target.value)}
            >
              {users.map((user) => {
                return <option value={user.email}>{user.nom}</option>;
              })}
            </Select>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button
              colorScheme="red"
              rounded={"200px"}
              ref={cancelRef}
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button
              rounded={"200px"}
              colorScheme="green"
              ml={3}
              onClick={(e) => assignProductToShop()}
            >
              Valider
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
