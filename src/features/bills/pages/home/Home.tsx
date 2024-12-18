import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillsByID } from "../../shared/models.ts";
import { auth } from "../../../../firebase-config.tsx";
import { deleteBill, getBillsByUser } from "../../services/bill.ts";
import "./Home.css";

import Header from "../../components/header/Header.tsx";
import Dashboard from "../../components/dashboard/Dahboard.tsx";

interface HomeProps {
  user: any;
}


function Home({ user }: HomeProps) {
  const [bills, setBills] = useState<BillsByID[]>([]);
  const navigate = useNavigate();

  // Obtener las facturas del usuario autenticado
  const fetchBills = async () => {
    if (!user || !user.uid) return;
    try {
      const userBills = await getBillsByUser(user.uid);
      setBills(userBills);
    } catch (e) {
      console.error("Error al cargar las facturas: ", e);
    }
  };

  useEffect(() => {
    fetchBills();
  }, [user]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const handleDeleteBill = async (id: string) => {
    await deleteBill(id);
    fetchBills();
  };

  return (
    <div className="home_container">
      <Header user={user} onSignOut={handleSignOut} />
      <Dashboard bills={bills} onDeleteBill={handleDeleteBill} />
    </div>
  );
}

export default Home;
