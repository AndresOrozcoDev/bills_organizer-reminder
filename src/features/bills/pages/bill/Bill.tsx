import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { addBill, getBillById, updateBill } from "../../services/bill.ts";
import Form from "../../components/Form/Form.tsx";
import { Bill as BillInterface } from "../../shared/models.ts";
import "./Bill.css";

interface BillProps {
  user: any;
}

function Bill({ user }: BillProps) {
  const [BillEdit, setBillEdit] = useState<BillInterface | null>(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBill = async () => {
      if (id) {
        try {
          const bill = await getBillById(id);
          if (bill) {
            setBillEdit(bill.data);
          } else {
            console.log(`No se encontró la factura con ID: ${id}`);
          }
        } catch (error) {
          console.error("Error al obtener la factura:", error);
        }
      } else {
        console.log("No hay ID");
      }
    };
    fetchBill();
  }, [id]);

  const handleAddOrEditBill = async (formData: BillInterface) => {
    if (!user || !user.uid) {
      console.error("Usuario no autenticado");
      return;
    }
    console.log(formData);
    
    try {
      if (BillEdit && id) {
        // Modo edición
        await updateBill(id, formData);
        console.log(`Factura con ID ${BillEdit.id} editada exitosamente.`);
      } else {
        // Modo agregar
        const billWithUserId = { ...formData, userId: user.uid };
        const result = await addBill(billWithUserId);
        console.log("Factura añadida exitosamente con ID: ", result);
      }
      setBillEdit(null);
    } catch (e) {
      console.error("Error al agregar/editar factura: ", e);
    }
  };

  return <Form billEdit={BillEdit} onSubmit={handleAddOrEditBill} />;
}

export default Bill;
