import { useState } from "react";
import Camera from "../../../../assets/icon/camera-solid.svg";
import { Bill } from "../../shared/models";
import "./Form.css";

interface FormProps {
  id: string | undefined;
  onSubmit: (formData: Bill) => void;
}
function Form({ id, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<Bill>({
    description: "",
    amount: 0,
    date: "",
    status: "",
    urlBill: "",
  });

  // TODO
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      description: "",
      amount: 0,
      date: "",
      status: "",
      urlBill: "",
  });
  };

  return (
    <div className="bg--while">
      <div className="file__container">
        <div>
          <div>
            <label htmlFor="upload">
              <input accept="image/*" id="upload" type="file" />
              <span>
                <img src={Camera} alt="Camera" />
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
              id="description"
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
              id="amount"
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
              id="date"
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
              id="status"
              className="form__input"
              value={formData.status}
              onChange={handleChange}
            >
              <option value="" disabled>Selecciona un estado</option>
              <option value="pendent">Pendiente</option>
              <option value="pay">Pagado</option>
            </select>
          </div>
          <div className="form__group">
            <label htmlFor="urlBill">Comprobante</label>
            <input
              id="urlBill"
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
            value={id ? "Ediatr" : "Agregar"}
          />
        </form>
      </div>
    </div>
  );
}

export default Form;
