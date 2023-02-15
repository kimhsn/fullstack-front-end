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
import * as si from "react-icons/si";
import axios from "axios";
import "./PopupAddShop.css";
import AuthContext from "../pages/context/AuthProvider";

export default function PopupAssignationProductToCategory({ idCategory }) {
  const { auth, setAuth } = useContext(AuthContext);
  const [productId, setProductId] = useState(0);
  const [products, setProducts] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();
  const getproducts = async () => {
    const response = await axios.get(`http://localhost:8080/shops/produits`, {
      headers: { Authorization: `Bearer ${auth.accesToken}` },
    });
    setProducts(response.data);
    onOpen();
  };
  useEffect(() => {
    const num = parseInt(productId);
    setProductId(num);
  }, [productId]);
  const assignProductsToCategory = async () => {
    console.log({
      idCategorie: idCategory,
      idProduit: productId,
    });
    const response = await axios.post(
      `http://localhost:8080/shops/categories/addCategorieToProduits`,
      {
        idCategorie: idCategory,
        idProduit: productId,
      },
      {
        headers: { Authorization: `Bearer ${auth.accesToken}` },
      }
    );
  };

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
            Assigner un/des produit(s) à cette categorie ?
          </AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Veuillez selectionnez le produit ou les produits que vous souhaitez
            assigner à cette categorie.
            <br />
            <Select
              mt={"15px"}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              placeholder="Produits à assigner"
              onChange={(e) => setProductId(e.target.value)}
            >
              {products.map((shop) => {
                return <option value={shop.id}>{shop.nom}</option>;
              })}
            </Select>
            {/*}
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
            </Select>*/}
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
              onClick={(e) => assignProductsToCategory()}
            >
              Valider
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
