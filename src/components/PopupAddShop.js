import React, { useRef } from "react";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialog,
  Input,
  Checkbox,
  Button,
  AlertDialogFooter,
  IconButton,
  ChakraProvider,
  useDisclosure,
} from "@chakra-ui/react";
import * as si from "react-icons/si";

export default function PopupAddShop({
  shopInVacation,
  setShopName,
  setShopTime,
  setShopInVacation,
  addShop,
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
        onClick={onOpen}
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
          <AlertDialogHeader>Ajouter une boutique ?</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            Merci de renseigner le nom de la boutique, son horaire d'ouverture
            pour les jours de la semaine et si la boutique est en congé ou non.
            <Input
              marginTop={"200px"}
              m={"10px"}
              rounded={"200px"}
              placeholder="Nom de la boutique"
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              border={0}
              color={"gray.500"}
              type="text"
              onChange={(e) => setShopName(e.target.value)}
              _placeholder={{
                color: "gray.500",
              }}
            />{" "}
            <Input
              placeholder="Horraire d'ouverture durant la semaine"
              required
              m={"10px"}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              border={0}
              color={"gray.500"}
              type="time"
              onChange={(e) => setShopTime(e.target.value)}
              _placeholder={{
                color: "gray.500",
              }}
            />{" "}
            <Checkbox
              m={"10px"}
              colorScheme="green"
              isChecked={shopInVacation}
              onChange={(e) => setShopInVacation(e.target.checked)}
            >
              En congé
            </Checkbox>
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
