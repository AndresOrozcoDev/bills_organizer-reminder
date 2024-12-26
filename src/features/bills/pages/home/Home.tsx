import { signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BillsByID } from "../../shared/models.ts";
import { auth } from "../../../../firebase-config.tsx";
import {
  deleteBill,
  deleteFile,
  getBillById,
  getBillsByUser,
} from "../../services/bill.ts";
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
    try {
      const bill = await getBillById(id);
      if (bill && bill.data.file && typeof bill.data.file === "string") {
        await deleteFile(bill.data.file);
      }
      await deleteBill(id);
      fetchBills();
      console.log(
        `Factura con ID ${id} y su archivo asociados han sido eliminados.`
      );
    } catch (error) {
      console.error("Error al eliminar la factura y su archivo: ", error);
    }
  };

  return (
    <div className="home_container">
      <Header user={user} onSignOut={handleSignOut} />
      <Dashboard bills={bills} onDeleteBill={handleDeleteBill} />
    </div>
  );
}

export default Home;
