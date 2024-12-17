import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Form from '../../components/Form/Form.tsx';
import "./Bill.css";
import { Bill as BillInterface } from "../../shared/models.ts";

interface BillProps {
  user: any;
}

function Bill({ user }: BillProps) {
  const [formValues, setFormValues] = useState<BillInterface | null>(null);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      console.log(id);
    } else {
      console.log("No hay ID");
    }
  }, [id]);

  const handleFormSubmit = (formData: BillInterface) => {
    setFormValues(formData);
    console.log("Form data received:", formData);
  };

  return (
    <Form id={id} onSubmit={handleFormSubmit} />
  )
}

export default Bill;
