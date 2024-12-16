import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../../../../firebase-config.tsx";

import Header from "../../components/header/Header.tsx";
import Dashboard from "../../components/dashboard/Dahboard.tsx";
import "./Home.css";

interface HomeProps {
  user: any;
}

function Home({ user }: HomeProps) {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      console.log("Sesión cerrada exitosamente");
      navigate("/");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <div className="home_container">
      <Header user={user} onSignOut={handleSignOut} />
      <Dashboard />
    </div>
  );
}

export default Home;
