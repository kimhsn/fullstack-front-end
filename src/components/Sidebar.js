import React, { useState, useContext, useEffect } from "react";
import Logo from "../images/Logo.png";
import LogoSideBar from "../images/LogoSideBar.png";
import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  AvatarBadge,
  Flex,
  HStack,
  Image,
  VStack,
  keyframes,
  Icon,
  useColorModeValue,
  Drawer,
  DrawerContent,
  Text,
  useDisclosure,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  ChakraProvider,
  MenuList,
} from "@chakra-ui/react";
import {
  FiHome,
  FiTrendingUp,
  FiSettings,
  FiBell,
  FiMenu,
  FiChevronDown,
} from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";
import UserProfileLogo from "../images/UserProfileLogo.jpg";
import { GiShop } from "react-icons/gi";
import { SiShopify } from "react-icons/si";
import { ImUsers } from "react-icons/im";
import { Link } from "react-router-dom";
import AuthContext from "../pages/context/AuthProvider";

const LinkItemsAdmin = [
  { name: "Accueil", icon: FiHome, path: "/" },
  { name: "Boutiques", icon: GiShop, path: "/Shops" },
  { name: "Catégories", icon: FiTrendingUp, path: "/Categories" },
  { name: "Produits", icon: SiShopify, path: "/Products" },
  { name: "Utilisateurs", icon: ImUsers, path: "/Users" },

  { name: "Paramètres", icon: FiSettings, path: "/userprofile" },
];
const LinkItemsSeller = [
  { name: "Accueil", icon: FiHome, path: "/" },
  { name: "Boutiques", icon: GiShop, path: "/Shops" },
  { name: "Catégories", icon: FiTrendingUp, path: "/Categories" },
  { name: "Produits", icon: SiShopify, path: "/Products" },
  { name: "Paramètres", icon: FiSettings, path: "/userprofile" },
];
const LinkItemsAnonyme = [
  { name: "Accueil", icon: FiHome, path: "/" },
  { name: "Boutiques", icon: GiShop, path: "/Shops" },
  { name: "Catégories", icon: FiTrendingUp, path: "/Categories" },
  { name: "Produits", icon: SiShopify, path: "/Products" },
];

export default function Sidebar({
  children,
  firstName,
  lastName,
  role,
  minH = "170vh",
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <ChakraProvider>
      <Box minH={minH} bg={useColorModeValue("gray.100", "gray.900")}>
        <SidebarContent
          onClose={() => onClose}
          display={{ base: "none", md: "block" }}
        />
        <Drawer
          autoFocus={false}
          isOpen={isOpen}
          placement="left"
          onClose={onClose}
          returnFocusOnClose={false}
          onOverlayClick={onClose}
          size="full"
        >
          <DrawerContent>
            <SidebarContent onClose={onClose} />
          </DrawerContent>
        </Drawer>
        {/* mobilenav */}
        <MobileNav
          role={role}
          firstname={firstName}
          lastname={lastName}
          onOpen={onOpen}
        />
        <Box ml={{ base: 0, md: 60 }} p="4">
          {children}
        </Box>
      </Box>
    </ChakraProvider>
  );
}

const SidebarContent = ({ onClose, ...rest }) => {
  const { auth, setAuth } = useContext(AuthContext);

  return (
    <Box
      transition="3s ease"
      bg={"black"}
      borderRight="1px"
      borderRightColor={useColorModeValue("gray.200", "gray.700")}
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      {...rest}
    >
      <Flex
        h="110"
        marginBottom={"75px"}
        alignItems="center"
        mx="8"
        justifyContent="space-between"
      >
        <Image marginTop={"40px"} size="50px" src={LogoSideBar} />
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>
      {auth.role === "ADMIN" ? (
        LinkItemsAdmin.map((link) => (
          <NavItem path={link.path} key={link.name} icon={link.icon}>
            {link.name}
          </NavItem>
        ))
      ) : (
        <>
          {auth.role === "USER" ? (
            LinkItemsSeller.map((link) => (
              <NavItem path={link.path} key={link.name} icon={link.icon}>
                {link.name}
              </NavItem>
            ))
          ) : (
            <>
              {LinkItemsAnonyme.map((link) => (
                <NavItem path={link.path} key={link.name} icon={link.icon}>
                  {link.name}
                </NavItem>
              ))}
            </>
          )}
        </>
      )}
    </Box>
  );
};

const NavItem = ({ icon, children, path, ...rest }) => {
  const [urlPath, setUrlPath] = useState(window.location.pathname);
  return (
    <Link
      to={path}
      style={{
        textDecoration: "none",
        fontSize: urlPath === path && "25px",
        fontWeight: urlPath === path && "bold",
      }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="5"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        color={urlPath === path ? "cyan.400" : "white"}
        //bg={urlPath === path ? "cyan.100" : "inherit"}
        _hover={{
          bg: "cyan.400",
          color: "white",
        }}
        {...rest}
      >
        {icon && (
          <Icon
            fontWeight={urlPath === path && "bold"}
            mr="4"
            fontSize={urlPath === path ? "29px" : "20px"}
            _groupHover={{
              color: "white",
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    </Link>
  );
};

const MobileNav = ({ firstname, lastname, role, onOpen, ...rest }) => {
  const { auth, setAuth } = useContext(AuthContext);
  const pulseRing = keyframes`
	0% {
    transform: scale(0.33);
  }
  40%,
  50% {
    opacity: 0;
  }
  100% {
    opacity: 0;
  }
	`;
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue("white", "gray.900")}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue("gray.200", "gray.700")}
      justifyContent={{ base: "space-between", md: "flex-end" }}
      {...rest}
    >
      {" "}
      {auth.role === "ADMIN" || auth.role === "USER" ? (
        <>
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />
          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            <Image marginLeft={"25px"} maxWidth={"55px"} src={Logo} />{" "}
          </Text>
          <HStack spacing={{ base: "0", md: "6" }}>
            <IconButton
              size="lg"
              variant="ghost"
              aria-label="open menu"
              icon={<FiBell />}
            />
            <Flex alignItems={"center"}>
              <Menu>
                <MenuButton
                  py={2}
                  transition="all 0.3s"
                  _focus={{ boxShadow: "none" }}
                >
                  <HStack>
                    <Box
                      as="div"
                      position="relative"
                      w={"50px"}
                      h={"50px"}
                      _before={{
                        content: "''",
                        position: "relative",
                        display: "block",
                        width: "300%",
                        height: "300%",
                        boxSizing: "border-box",
                        marginLeft: "-100%",
                        marginTop: "-100%",
                        borderRadius: "50%",
                        bgColor: "green",
                        animation: `2.25s ${pulseRing} cubic-bezier(0.455, 0.03, 0.515, 0.955) -0.4s infinite`,
                      }}
                    >
                      <Avatar
                        size="full"
                        src={UserProfileLogo}
                        position="absolute"
                        top={0}
                        right={"0px"}
                      >
                        {" "}
                        <AvatarBadge boxSize="2.5em" bg="green.500" />
                      </Avatar>
                    </Box>
                    <VStack
                      display={{ base: "none", md: "flex" }}
                      alignItems="flex-start"
                      spacing="1px"
                      ml="2"
                    >
                      <Text fontSize="sm">
                        {lastname} {firstname}
                      </Text>
                      <Text fontSize="xs" color="gray.600">
                        {role}
                      </Text>
                    </VStack>
                    <Box display={{ base: "none", md: "flex" }}>
                      <FiChevronDown />
                    </Box>
                  </HStack>
                </MenuButton>
                <MenuList>
                  <Link to="/userprofile">
                    <MenuItem>Profil</MenuItem>
                  </Link>

                  <MenuDivider />
                  <Link to="/register">
                    <MenuItem>Se déconnecter</MenuItem>
                  </Link>
                </MenuList>
              </Menu>
            </Flex>
          </HStack>{" "}
        </>
      ) : (
        <>
          <IconButton
            display={{ base: "flex", md: "none" }}
            onClick={onOpen}
            variant="outline"
            aria-label="open menu"
            icon={<FiMenu />}
          />
          <Text
            display={{ base: "flex", md: "none" }}
            fontSize="2xl"
            fontFamily="monospace"
            fontWeight="bold"
          >
            <Image marginLeft={"25px"} maxWidth={"55px"} src={Logo} />{" "}
          </Text>
          <HStack spacing={{ base: "0", md: "6" }}>
            <Flex alignItems={"center"}>
              <HStack>
                <Link to="/register">
                  <HStack spacing={{ base: "0", md: "6" }}>
                    <IconButton
                      size="lg"
                      variant="ghost"
                      aria-label="open menu"
                      icon={<BiLogInCircle size={40} />}
                    />
                  </HStack>
                </Link>
              </HStack>
            </Flex>
          </HStack>{" "}
        </>
      )}
    </Flex>
  );
};
