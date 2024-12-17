import Camera from "../../../../assets/icon/camera-solid.svg";
import "./Form.css";

interface FormProps {
  id: any;
}
function Form({ id }: FormProps) {

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
            <label htmlFor="descripcion">Descripcion *</label>
            <input
              id="descripcion"
              className="form__input"
              type="text"
              placeholder="Seguro auto"
              required
            />
          </div>
          <div className="form__group">
            <label htmlFor="monto">Monto *</label>
            <input
              id="monto"
              className="form__input"
              type="number"
              placeholder="$12.00"
              required
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
            />
          </div>
          <div className="form__group">
            <label htmlFor="status">Estado *</label>
            <select id="status" className="form__input">
              <option value="" disabled selected>Selecciona un estado</option>
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
            />
          </div>
          <input className="btn" type="submit" value={id ? 'Ediatr' : 'Agregar'} />
        </form>
      </div>
    </div>
  );
}

export default Form;
