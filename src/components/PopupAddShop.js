import React, { useRef } from "react";
import {
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogHeader,
  AlertDialogContent,
  Heading,
  AlertDialogOverlay,
  AlertDialog,
  Flex,
  Text,
  Center,
  Square,
  Box,
  Input,
  Checkbox,
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

export default function PopupAddShop({
  setErrorPopup,
  setShopCode,
  setShopDescription,
  errorPopup,
  shopInVacation,
  setShopName,
  setMondayMorningFrom,
  setMondayMorningTo,

  setMondayAfternoonFrom,
  setMondayAfternoonTo,

  setTuesdayMorningFrom,
  setTuesdayMorningTo,

  setTuesdayAfternoonFrom,
  setTuesdayAfternoonTo,

  setWednesdayMorningFrom,
  setWednesdayMorningTo,

  setWednesdayAfternoonFrom,
  setWednesdayAfternoonTo,

  setThursdayMorningFrom,
  setThursdayMorningTo,

  setThursdayAfternoonFrom,
  setThursdayAfternoonTo,

  setFridayMorningFrom,
  setFridayMorniongTo,

  setFridayAfternoonFrom,
  setFridayAfternoonTo,

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
        onClick={(e) => {
          setShopCode("");
          setShopDescription("");
          setShopName("");
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
        size={"4xl"}
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>Ajouter une boutique ?</AlertDialogHeader>{" "}
          <AlertDialogCloseButton />
          <Flex>
            <Center w="500px" alignItems={"initial"}>
              <AlertDialogBody mt={"0px"}>
                Veuillez renseigner les informations de la boutique.
                <FormLabel mt={"0px"} mb={0} fontSize={"15px"} color={"gray"}>
                  Les champs marqués d'un <label className="label">*</label>{" "}
                  sont obligatoires.
                </FormLabel>
                <FormLabel mt={"35px"} mb={0} fontSize={"15px"} color={"black"}>
                  Nom de la boutique <label className="label">*</label>
                </FormLabel>
                <Input
                  required={true}
                  mt={0}
                  rounded={"200px"}
                  bgGradient="linear(to-r, gray.200 ,pink.100)"
                  border={0}
                  color={"gray.500"}
                  type="text"
                  onChange={(e) => setShopName(e.target.value)}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <FormLabel mt={"15px"} mb={0} fontSize={"15px"} color={"black"}>
                  Code de la boutique
                </FormLabel>
                <Input
                  required={true}
                  mt={0}
                  rounded={"200px"}
                  bgGradient="linear(to-r, gray.200 ,pink.100)"
                  border={0}
                  color={"gray.500"}
                  type="text"
                  onChange={(e) => setShopCode(e.target.value)}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <FormLabel mt={"15px"} mb={0} fontSize={"15px"} color={"black"}>
                  Description
                </FormLabel>
                <Textarea
                  h={"240px"}
                  mt={0}
                  rounded={"30"}
                  bgGradient="linear(to-r, gray.200 ,pink.100)"
                  border={0}
                  color={"gray.500"}
                  type="text"
                  onChange={(e) => setShopDescription(e.target.value)}
                  _placeholder={{
                    color: "gray.500",
                  }}
                />
                <Checkbox
                  mt={"30px"}
                  color="black"
                  isChecked={shopInVacation}
                  onChange={(e) => setShopInVacation(e.target.checked)}
                >
                  En congé
                </Checkbox>
                {errorPopup && (
                  <FormLabel mt={"10px"} mb={0} fontSize={"15px"} color={"red"}>
                    Un ou des champs obligatoires n'ont pas été remplis
                  </FormLabel>
                )}
              </AlertDialogBody>
            </Center>
            <Square w="400px" marginLeft={5}>
              <Box mb="4" width={"100%"}>
                {" "}
                <Heading as="h2" size="md" mb="3">
                  Horaires d'ouverture
                </Heading>
                <Text fontWeight="bold">Lundi</Text>
                <Box>
                  <Text as="span" mr="44px">
                    Matin :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setMondayMorningFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      onChange={(e) => setMondayMorningTo(e.target.value)}
                      type="time"
                    />{" "}
                  </Text>
                </Box>
                <Box mb="1">
                  <Text as="span" mr="2">
                    Après-midi :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setMondayAfternoonFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setMondayAfternoonTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Text fontWeight="bold">Mardi</Text>
                <Box>
                  <Text as="span" mr="44px">
                    Matin :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setTuesdayMorningFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setTuesdayMorningTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Box mb="1">
                  <Text as="span" mr="2">
                    Après-midi :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setTuesdayAfternoonFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setTuesdayAfternoonTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Text fontWeight="bold">Mercredi</Text>
                <Box>
                  <Text as="span" mr="44px">
                    Matin :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setWednesdayMorningFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setWednesdayMorningTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Box mb="1">
                  <Text as="span" mr="2">
                    Après-midi :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) =>
                        setWednesdayAfternoonFrom(e.target.value)
                      }
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setWednesdayAfternoonTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Text fontWeight="bold">Jeudi</Text>
                <Box>
                  <Text as="span" mr="44px">
                    Matin :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setThursdayMorningFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setThursdayMorningTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Box mb="1">
                  <Text as="span" mr="2">
                    Après-midi :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setThursdayAfternoonFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setThursdayAfternoonTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Text fontWeight="bold">Vendredi</Text>
                <Box>
                  <Text as="span" mr="44px">
                    Matin :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setFridayMorningFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setFridayMorniongTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
                <Box mb="1">
                  <Text as="span" mr="2">
                    Après-midi :
                  </Text>
                  <Text as="span">
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setFridayAfternoonFrom(e.target.value)}
                    />{" "}
                    -{" "}
                    <Input
                      rounded={"200px"}
                      bgGradient="linear(to-r, blue.200,pink.200)"
                      width={"120px"}
                      type="time"
                      onChange={(e) => setFridayAfternoonTo(e.target.value)}
                    />{" "}
                  </Text>
                </Box>
              </Box>
            </Square>
          </Flex>
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
                const isAdded = addShop();
                isAdded
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
