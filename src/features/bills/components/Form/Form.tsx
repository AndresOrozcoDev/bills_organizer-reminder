import "./Form.css";
import { Bill } from "../../shared/models";
import { useEffect, useState } from "react";
import Camera from "../../../../assets/icon/camera-solid.svg";

interface FormProps {
  billEdit: Bill | null;
  onSubmit: (formData: Bill) => void;
}

// Definimos los valores por defecto para formData
const defaultFormData: Bill = {
  id: "",
  description: "",
  amount: 0,
  date: "",
  status: "",
  urlBill: "",
  userId: "",
};

function Form({ billEdit, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<Bill>(defaultFormData);

  // Actualiza formData cuando billEdit cambia
  useEffect(() => {
    if (billEdit) {
      setFormData(billEdit);
    } else {
      setFormData(defaultFormData);
    }
  }, [billEdit]);

  // Maneja el cambio de valores en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(defaultFormData); // Resetea el formulario tras el envío
  };

  return (
    <div className="bg--while">
      <div className="file__container">
        <div>
          <div>
            <label htmlFor="upload" className="file__label">
              <input
                accept="image/*"
                id="upload"
                type="file"
                aria-label="Subir archivo"
              />
              <span>
                <img src={Camera} alt="Icono de cámara" />
              </span>
            </label>
          </div>
        </div>
        <small>Allowed *.jpeg, *.jpg, *.png, *.gif max size of 3.1 MB</small>
      </div>

      <div className="field__container">
        <form onSubmit={handleSubmit}>
          <div className="form__group">
            <label htmlFor="description">Descripcion *</label>
            <input
              name="description"
              className="form__input"
              type="text"
              placeholder="Seguro auto"
              required
              value={formData.description}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label htmlFor="amount">Monto *</label>
            <input
              name="amount"
              className="form__input"
              type="number"
              placeholder="$12.00"
              required
              value={formData.amount}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label htmlFor="date">Fecha limite *</label>
            <input
              name="date"
              className="form__input"
              type="date"
              placeholder="12/22/2024"
              required
              value={formData.date}
              onChange={handleChange}
            />
          </div>

          <div className="form__group">
            <label htmlFor="status">Estado *</label>
            <select
              name="status"
              className="form__input"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>
                Selecciona un estado
              </option>
              <option value="Pendiente">Pendiente</option>
              <option value="Pagado">Pagado</option>
            </select>
          </div>

          <div className="form__group">
            <label htmlFor="urlBill">Comprobante</label>
            <input
              name="urlBill"
              className="form__input"
              type="text"
              placeholder="Comprobante url"
              value={formData.urlBill}
              onChange={handleChange}
            />
          </div>

          <input
            className="btn"
            type="submit"
            value={billEdit ? "Editar" : "Agregar"}
          />
        </form>
      </div>
    </div>
  );
}

export default Form;
