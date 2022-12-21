import React, { useContext } from "react";
import Sidebar from "../components/Sidebar";
import AuthContext from "./context/AuthProvider";

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  console.log(auth.id);
  return (
    <Sidebar firstName={auth.prenom} lastName={auth.nom} pseudo={auth.pseudo} />
  );
}
