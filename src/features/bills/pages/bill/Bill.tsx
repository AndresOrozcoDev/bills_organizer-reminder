import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from '../../components/Form/Form.tsx';
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
    <Form id={id} />
  )
}

export default Bill;
