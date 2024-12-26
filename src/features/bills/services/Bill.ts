import { db } from "../../../firebase-config";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  where,
  query,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { 
  getStorage, 
  ref, 
  uploadBytes, 
  getDownloadURL 
} from "firebase/storage";
import { Bill, BillsByID } from "../shared/models";

// Servicio para obtener las facturas de un usuario en Firestore.
export const getBillsByUser = async (userId: string): Promise<BillsByID[]> => {
  try {
    const billsRef = collection(db, "bills");
    const q = query(billsRef, where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    // Mapea los documentos para que coincidan con la interfaz BillWithId
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data() as Bill,
    }));
  } catch (e) {
    console.error("Error al obtener las facturas: ", e);
    throw e;
  }
};

// Servicio para obtener la factura por ID de la factura.
export const getBillById = async (
  billId: string
): Promise<BillsByID | null> => {
  try {
    const billDocRef = doc(db, "bills", billId);
    const billDoc = await getDoc(billDocRef);
    if (billDoc.exists()) {
      return {
        id: billDoc.id,
        data: billDoc.data() as Bill,
      };
    } else {
      console.warn(`No se encontró la factura con ID: ${billId}`);
      return null;
    }
  } catch (e) {
    console.error("Error al obtener la factura por ID: ", e);
    throw e;
  }
};

// Servicio para agregar una factura a Firestore.
export const addBill = async (bill: Bill) => {
  try {
    const docRef = await addDoc(collection(db, "bills"), bill);
    return docRef.id;
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e;
  }
};

// Servicio para editar una factura en Firestore.
export const updateBill = async (
  billId: string,
  updatedBill: Partial<Bill>
) => {
  try {
    const billDocRef = doc(db, "bills", billId);
    const billDoc = await getDoc(billDocRef);
    if (!billDoc.exists()) {
      console.warn(
        `No se encontró la factura con ID ${billId} para actualizar.`
      );
      return;
    }
    await updateDoc(billDocRef, updatedBill);
    console.log(`Factura con ID ${billId} actualizada correctamente.`);
  } catch (e) {
    console.error("Error al actualizar la factura: ", e);
    throw e;
  }
};

// Servicio para eliminar una factura en firestore
export const deleteBill = async (billId: string) => {
  try {
    const billDocRef = doc(db, "bills", billId);
    const billDoc = await getDoc(billDocRef);
    if (!billDoc.exists()) {
      console.warn(
        `No se encontró la factura con ID: ${billId} para eliminar.`
      );
      return;
    }
    await deleteDoc(billDocRef);
    console.log(`Factura con ID ${billId} eliminada correctamente.`);
  } catch (e) {
    console.error("Error al eliminar la factura: ", e);
    throw e;
  }
};

// Servicio para subir un archivo a Firebase Storage
export const uploadFile = async (file: File): Promise<string> => {
  try {
    const storage = getStorage();
    const fileRef = ref(storage, `bills/${file.name}`);

    // Subir archivo a Firebase Storage
    const snapshot = await uploadBytes(fileRef, file);

    // Obtener la URL de descarga del archivo subido
    const downloadURL = await getDownloadURL(snapshot.ref);

    console.log(`Archivo subido correctamente: ${downloadURL}`);
    return downloadURL;
  } catch (e) {
    console.error("Error al subir el archivo: ", e);
    throw e;
  }
};
