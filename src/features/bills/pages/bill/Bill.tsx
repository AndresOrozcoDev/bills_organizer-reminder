import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  addBill,
  deleteFile,
  getBillById,
  updateBill,
  uploadFile,
} from "../../services/bill.ts";
import Form from "../../components/Form/Form.tsx";
import { Bill as BillInterface } from "../../shared/models.ts";
import { useNavigate } from "react-router-dom";
import "./Bill.css";

interface BillProps {
  user: any;
}

function Bill({ user }: BillProps) {
  const [BillEdit, setBillEdit] = useState<BillInterface | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

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

    try {
      let fileURL: string | null = null;

      // Verificar si existe una factura para editar
    if (
      BillEdit && 
      typeof BillEdit.file === "string" && // Asegurar que sea una URL (string)
      formData.file && 
      formData.file instanceof File // Asegurar que el nuevo archivo sea un File
    ) {
      // Eliminar el archivo anterior
      await deleteFile(BillEdit.file);
    }

    // Subir archivo si es de tipo File
    if (formData.file && formData.file instanceof File) {
      fileURL = await uploadFile(formData.file);
    }

      // Crear el objeto bill con la URL del archivo (si existe)
      const billData: BillInterface = {
        ...formData,
        file: fileURL,
        userId: user.uid,
      };

      if (BillEdit && id) {
        await updateBill(id, billData);
        console.log(`Factura con ID ${BillEdit.id} editada exitosamente.`);
      } else {
        const result = await addBill(billData);
        console.log("Factura añadida exitosamente con ID: ", result);
      }

      navigate("/home");
      setBillEdit(null);
    } catch (e) {
      console.error("Error al agregar/editar factura: ", e);
    }
  };

  return <Form billEdit={BillEdit} onSubmit={handleAddOrEditBill} />;
}

export default Bill;
