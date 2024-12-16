import { User } from "../../shared/models.ts";
import { useNavigate } from "react-router-dom";
import Form from "../../components/form/Form.tsx";
import { auth } from "../../../../firebase-config.tsx";
import { signInWithEmailAndPassword } from "firebase/auth";
import "./Login.css";

function Login() {
  const navigate = useNavigate();

  const handleLoginSubmit = async (data: User) => {
    const { email, password } = data;
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("Usuario conectado:", userCredential.user);
      navigate("/home");
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error al iniciar sesión:", errorMessage);
    }
  };

  return (
    <div className="form__container">
      <Form title="Iniciar Sesión" onSubmit={handleLoginSubmit} />
      <small>
        ¿No tienes una cuenta?{" "}
        <a href="/register" className="small--register">
          Crea una cuenta
        </a>
      </small>
    </div>
  );
}

export default Login;
