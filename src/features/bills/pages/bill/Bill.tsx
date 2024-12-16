import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "./Bill.css";

interface BillProps {
  user: any;
}

function Bill({ user }: BillProps) {
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log(id);
    } else {
      console.log("No hay ID");
    }
  }, [id]);

  return (
    <div>
      <h1>{id ? 'Editar Factura' : 'Crear Factura'}</h1>
      {id ? (
        <p>Editando la factura con ID: {id}</p>
      ) : (
        <p>Creando una nueva factura</p>
      )}
    </div>
  )
}

export default Bill;
