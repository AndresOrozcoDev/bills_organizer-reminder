import { useState } from "react";
import Logo from '../../../../assets/logo/favicon.png';
import "./Form.css";


interface FormProps {
  onSubmit: (credentials: { email: string; password: string }) => void;
  title: string;
}

function Form({ onSubmit, title }: FormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form__header">
        <img
          src={Logo}
          className="form__logo"
          alt="Uko Logo"
        />
        <h2>{title}</h2>
      </div>
      <div className="form__group">
        <label htmlFor="email">Email</label>
        <input
          id="email"
          className="form__input"
          type="email"
          placeholder="Correo electrónico"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="form__group">
        <label htmlFor="password">Constraseña</label>
        <input
          id="password"
          className="form__input"
          type="password"
          placeholder="Contraseña"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <input
        className="btn btn--primary"
        type="submit"
        value={title}
        title={title}
      />
    </form>
  );
}

export default Form;
