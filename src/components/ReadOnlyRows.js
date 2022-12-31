import React from "react";

import { Td, Tr } from "@chakra-ui/react";
const ReadOnlyRow = ({ product }) => {
  return (
    <Tr>
      <Td>{product.nom}</Td>
      <Td>{product.prix} €</Td>

      <Td>{product.codeProduit}</Td>

      <Td>{product.description}</Td>
    </Tr>
  );
};

export default ReadOnlyRow;
