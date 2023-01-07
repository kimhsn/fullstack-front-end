import React, { useRef } from "react";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialog,
  Input,
  Button,
  AlertDialogFooter,
  IconButton,
  ChakraProvider,
  useDisclosure,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import * as si from "react-icons/si";
import "./PopupAddShop.css";

export default function PopupAddProduct({
  setProductCode,
  setProductDescription,
  errorPopup,
  setProductName,
  setProductPrice,
  addProduct,
  setErrorPopup,
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef();

  return (
    <ChakraProvider>
      <IconButton
        rounded={"200px"}
        fontFamily={"heading"}
        bgGradient="linear(to-r, blue.400,pink.400)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-r, blue.600,pink.600)",
          boxShadow: "xl",
        }}
        position={"fixed"}
        right="65px"
        top={"490"}
        onClick={(e) => {
          setProductName("");
          setProductPrice("");
          setErrorPopup("");
          onOpen();
        }}
        size={"lg"}
        icon={<si.SiAddthis />}
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
          <AlertDialogHeader>Ajouter un produit ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Veuillez renseigner les informations du produit .
            <FormLabel mt={"10px"} mb={0} fontSize={"15px"} color={"gray"}>
              Les champs marqués d'un <label className="label">*</label> sont
              obligatoires.
            </FormLabel>
            <FormLabel mt={"15px"} mb={0} fontSize={"15px"} color={"black"}>
              Nom du produit <label className="label">*</label>
            </FormLabel>
            <Input
              required={true}
              mt={0}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              border={0}
              color={"gray.500"}
              type="text"
              onChange={(e) => setProductName(e.target.value)}
              _placeholder={{
                color: "gray.500",
              }}
            />{" "}
            <FormLabel mt={"15px"} mb={0} fontSize={"15px"} color={"black"}>
              Prix du produit <label className="label">*</label>
            </FormLabel>
            <Input
              required={true}
              mt={0}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              border={0}
              color={"gray.500"}
              type="text"
              onChange={(e) => setProductPrice(e.target.value)}
              _placeholder={{
                color: "gray.500",
              }}
            />{" "}
            <FormLabel mt={"15px"} mb={0} fontSize={"15px"} color={"black"}>
              Code du produit
            </FormLabel>
            <Input
              required
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              border={0}
              color={"gray.500"}
              type="int"
              onChange={(e) => setProductCode(e.target.value)}
              _placeholder={{
                color: "gray.500",
              }}
            />{" "}
            <FormLabel mt={"15px"} mb={0} fontSize={"15px"} color={"black"}>
              Description du produit
            </FormLabel>
            <Textarea
              mt={0}
              rounded={"30"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              border={0}
              color={"gray.500"}
              type="text"
              onChange={(e) => setProductDescription(e.target.value)}
              _placeholder={{
                color: "gray.500",
              }}
            />
            {errorPopup && (
              <FormLabel mt={"10px"} mb={0} fontSize={"15px"} color={"red"}>
                {errorPopup}
              </FormLabel>
            )}
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
              onClick={(e) => {
                const test = addProduct();
                test
                  .then((res) => {
                    res && onClose();
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              Valider
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </ChakraProvider>
  );
}
