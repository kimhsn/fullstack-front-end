import {
  Box,
  Center,
  Stack,
  Avatar,
  Image,
  Select,
  Flex,
  ChakraProvider,
  Input,
} from "@chakra-ui/react";
import * as ai from "react-icons/ai";
import * as tb from "react-icons/tb";

export default function EditableCardUser({
  item,
  updateUser,
  setIdShop,
  setEmail,
  setNom,
  setPrenom,
  setRole,
}) {
  return (
    <ChakraProvider>
      <Center py={6}>
        <Box
          maxW={"435px"}
          w={"full"}
          boxShadow={"2xl"}
          rounded={"md"}
          p={18}
          overflow={"hidden"}
        >
          <Image
            h={"120px"}
            w={"370px"}
            src={
              "https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80"
            }
            objectFit={"cover"}
          />
          <Flex justify={"center"} mt={-12}>
            <Avatar
              size={"xl"}
              src={"https://cdn-icons-png.flaticon.com/512/428/428933.png"}
              alt={"Author"}
              css={{
                border: "2px solid white",
              }}
            />
          </Flex>

          <Box p={6}>
            <Stack spacing={0} align={"center"} mb={5}>
              <Flex>
                {" "}
                <Input
                  ml={7}
                  width="80px"
                  border={0}
                  size={0}
                  focusBorderColor={"transparent"}
                  placeholder={item.prenom}
                  onChange={(e) => setPrenom(e.target.value)}
                  style={{ fontWeight: "bold", fontSize: "24px" }}
                />{" "}
                <Input
                  ml={3}
                  border={0}
                  size={0}
                  width="80px"
                  focusBorderColor={"transparent"}
                  placeholder={item.nom}
                  onChange={(e) => setNom(e.target.value)}
                  style={{ fontWeight: "bold", fontSize: "24px" }}
                />{" "}
              </Flex>
              <Input
                color={"gray.500"}
                ml={3}
                border={0}
                width="200px"
                focusBorderColor={"transparent"}
                placeholder={item.email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ fontWeight: "bold", fontSize: "24px" }}
              />{" "}
            </Stack>
            <Select
              color={"gray.500"}
              border={0}
              rounded={"200px"}
              bgGradient="linear(to-r, gray.200 ,pink.100)"
              placeholder="Rôle"
              onChange={(e) => setRole(e.target.value)}
            >
              <option value={"ADMIN"}>Administrateur</option>
              <option value={"Vendeur-Livreur"}>Vendeur-Livreur</option>;
            </Select>
            <Stack mt={5} direction={"row"} justify={"center"} spacing={6}>
              <Stack spacing={0} align={"center"}>
                <ai.AiFillCheckCircle
                  cursor="pointer"
                  color={"green"}
                  size={"37px"}
                  right={"0px"}
                  onClick={() => updateUser(item.id)}
                  rounded={"full"}
                />
              </Stack>
              <Stack spacing={0} align={"center"}>
                <tb.TbArrowBack
                  cursor="pointer"
                  size={"40px"}
                  right={"0px"}
                  onClick={() => setIdShop(null)}
                  rounded={"full"}
                  color="red"
                />
              </Stack>
            </Stack>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
}
