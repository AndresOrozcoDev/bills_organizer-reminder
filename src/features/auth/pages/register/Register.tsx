import { User } from '../../shared/models.ts';
import { useNavigate } from "react-router-dom";
import Form from '../../components/form/Form.tsx';
import { auth } from '../../../../firebase-config.tsx';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();

  const handleRegisterSubmit = async (data: User) => {
    console.log("Datos de Registro:", data);
    const { email, password } = data;
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuario registrado:', userCredential.user);
      navigate("/home");
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error("Error al registrarse:", errorMessage);
    }
  };

  return (
    <div  className="form__container">
      <Form
        title="Registrarse"
        onSubmit={handleRegisterSubmit}
      />
    </div>
  );
};

export default Register;
