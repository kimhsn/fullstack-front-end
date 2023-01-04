import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";

export default function Paramettres() {
  const { auth, setAuth } = useContext(AuthContext);
  console.log(auth.id);
  let a = 1;
  console.log(a + 1); //pagination state
  return (
    <Sidebar firstName={auth.prenom} lastName={auth.nom} role={auth.role} />
  );
}
