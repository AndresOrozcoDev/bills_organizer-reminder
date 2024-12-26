import "./Form.css";
import { Bill } from "../../shared/models";
import { useEffect, useState } from "react";

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
  file: "",
  userId: "",
};

function Form({ billEdit, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<Bill>(defaultFormData);
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>("");

  // Actualiza formData cuando billEdit cambia
  useEffect(() => {
    if (billEdit) {
      console.log(billEdit);
      setFormData(billEdit);
      if (billEdit.file) {
        // Si el archivo es una URL (string)
        if (typeof billEdit.file === "string") {
          setFileUrl(billEdit.file); // Si es una URL de archivo, lo usamos directamente
        } else if (billEdit.file instanceof File) {
          // Si es un objeto de tipo File, creamos una URL para previsualizarlo
          setFileUrl(URL.createObjectURL(billEdit.file));
        }
      }
    } else {
      setFormData(defaultFormData);
      setFileUrl(null);
    }
  }, [billEdit]);

  // Maneja el cambio de valores en los campos del formulario
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "file" && e.target instanceof HTMLInputElement) {
      const uploadedFile = e.target.files ? e.target.files[0] : null;
      setFile(uploadedFile); // Guarda el archivo en el estado
      // Si es una imagen, generamos una URL para previsualizarla
      if (uploadedFile && uploadedFile.type.startsWith("image/")) {
        setFileUrl(URL.createObjectURL(uploadedFile));
      } else {
        setFileUrl(null); // Si no es una imagen, no mostramos previsualización
      }
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  // Maneja el envío del formulario
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const finalData = { ...formData, file }; // Agrega el archivo al formulario
    onSubmit(finalData);
    setFormData(defaultFormData); // Resetea el formulario tras el envío
    setFile(null);
    setFileUrl(null);
  };

  return (
    <div className="bg--while">
      <div className="file__container">
        <div>
          <label htmlFor="upload" className="file__label">
            <input
              accept="image/*"
              id="upload"
              type="file"
              aria-label="Subir archivo"
              onChange={handleChange}
            />
            <div>
              <img src={fileUrl || ""} alt="Archivo" />
            </div>
          </label>
        </div>
        {file && <small>{file.name}</small>}
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
