import {
  Box,
  Center,
  Heading,
  Text,
  Stack,
  Avatar,
  Grid,
  Image,
  GridItem,
  Flex,
  ChakraProvider,
  Icon,
} from "@chakra-ui/react";
import { FcViewDetails, FcPaid } from "react-icons/fc";

import PopupAssignation from "./PopupAssignation";
import * as ai from "react-icons/ai";
import * as fi from "react-icons/fi";
import { Link } from "react-router-dom";
import Logo from "../images/a.jpg";

export default function ReadOnlyCard({
  item,
  deleteShop,
  setIdShop,
  role,
  idUserAuth,
}) {
  const formateDate = (date) => {
    const dateObj = new Date(date);
    const options = {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const formattedDate = dateObj
      .toLocaleDateString("en-GB", options)
      .replace(",", " ");
    return formattedDate;
  };
  return (
    <ChakraProvider>
      <GridItem key={item.idBoutique}>
        <Center py={6} cursor="pointer">
          <Box
            maxW={"435px"}
            w={"full"}
            boxShadow={"2xl"}
            rounded={"md"}
            p={6}
            overflow={"hidden"}
          >
            <Link to={`/detailsshop/${item.idBoutique}`}>
              <Box
                h={"210px"}
                bg={"gray.100"}
                mt={-6}
                mx={-6}
                mb={6}
                pos={"relative"}
              >
                <Image src={Logo} layout={"fill"} />
              </Box>{" "}
              <Grid templateColumns="repeat(5, 1fr)">
                <GridItem colSpan={3} h="20">
                  <Stack>
                    {item.conge == true ? (
                      <Text
                        color={"red.500"}
                        textTransform={"uppercase"}
                        fontWeight={800}
                        fontSize={"sm"}
                        letterSpacing={1.1}
                      >
                        En congé
                      </Text>
                    ) : (
                      <Text
                        color={"green.500"}
                        textTransform={"uppercase"}
                        fontWeight={800}
                        fontSize={"sm"}
                        letterSpacing={1.1}
                      >
                        En activité
                      </Text>
                    )}
                    <Heading fontSize={"2xl"} fontFamily={"body"}>
                      {item.nom}
                    </Heading>
                  </Stack>
                </GridItem>
                <GridItem h="20">
                  <Feature
                    icon={<Icon as={FcViewDetails} w={10} h={10} />}
                    title={item.categories.length}
                  />
                </GridItem>
                <GridItem h="20">
                  <Feature
                    icon={<Icon as={FcPaid} w={10} h={10} />}
                    title={item.produits.length}
                  />
                </GridItem>
              </Grid>
              <Stack>
                <Text color={"gray.500"}>{item.description}</Text>
              </Stack>
            </Link>
            <Stack mt={6} direction={"row"} spacing={4} align={"center"}>
              <Link to={`/detailsshop/${item.idBoutique}`}>
                <Avatar
                  src={"https://cdn-icons-png.flaticon.com/512/428/428933.png"}
                  alt={"Author"}
                />
              </Link>{" "}
              <Stack
                direction={"column"}
                spacing={0}
                width={"100%"}
                fontSize={"sm"}
              >
                <Link to={`/detailsshop/${item.idBoutique}`}>
                  <Text fontWeight={600}>{item.user}</Text>
                  <Text size={2} color={"gray.500"}>
                    {formateDate(item.creationData)}
                  </Text>
                </Link>{" "}
              </Stack>
              {role == "ADMIN" || role == "VENDEUR_LIVREUR" ? (
                <>
                  {item.idUser == idUserAuth && role == "VENDEUR_LIVREUR" ? (
                    <>
                      <PopupAssignation idBoutique={item.idBoutique} />
                      <fi.FiEdit
                        cursor="pointer"
                        size={"60px"}
                        right={"0px"}
                        onClick={() => setIdShop(item.idBoutique)}
                        rounded={"full"}
                        color="#0000CD"
                      />
                      <ai.AiFillDelete
                        cursor="pointer"
                        size={"60px"}
                        right={"0px"}
                        onClick={() => deleteShop(item.idBoutique)}
                        rounded={"full"}
                        color="red"
                      />
                    </>
                  ) : null}
                </>
              ) : null}
            </Stack>
          </Box>
        </Center>
      </GridItem>
    </ChakraProvider>
  );
}
const Feature = ({ title, icon }) => {
  return (
    <Stack>
      <Flex w={10} ml={10} h={8}>
        {icon}
      </Flex>
      <Text position={"relative"} top={0} left={"50px"} fontWeight={600}>
        {title}
      </Text>{" "}
    </Stack>
  );
};
