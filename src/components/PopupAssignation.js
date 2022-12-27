import React, { useRef, useState } from "react";
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
import * as si from "react-icons/si";
import axios from "axios";
import "./PopupAddShop.css";

export default function PopupAssignation({ addShop }) {
  const [productName, setProductName] = useState("");
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const getproducts = async () => {
    const response = await axios.get(
      `http://localhost:8080/shpos/produits/read`
    );
    setProducts(response.data);
    onOpen();
  };
  console.log(productName);
  return (
    <ChakraProvider>
      <si.SiShopify
        cursor="pointer"
        size={"60px"}
        marginRight={0}
        right={"0px"}
        rounded={"full"}
        color={"green"}
        onClick={getproducts}
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
            Assigner un produit à cette boutique ?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Veuillez selectionnez le produit que vous souhaitez assigner à cette
            boutique.
            <Select
              mt={"15px"}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              placeholder="Produits à assigner"
              onChange={(e) => setProductName(e.target.value)}
            >
              {products.map((shop) => {
                return <option value={shop.id}>{shop.nom}</option>;
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
              onClick={(e) => addShop()}
            >
              Valider
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
