import { useEffect, useState } from "react";
import { auth } from "./firebase-config.tsx";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

import Home from "./features/bills/pages/home/Home.tsx";
import Login from "./features/auth/pages/login/Login.tsx";
import Bill from "./features/bills/pages/bill/Bill.tsx";
import Register from "./features/auth/pages/register/Register.tsx";
import ProtectedRoute from "./features/bills/components/protectedRoute/ProtectedRoute.tsx";
import NotFound from "./shared/pages/404/404.tsx";


function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        console.log("onAuthStateChanged activado:", currentUser);
        setUser(currentUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    // Limpieza del listener cuando el componente se desmonte
    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="bg--fullPageCenter">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="bg">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute user={user}>
              <Home user={user} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bill/:id?"
          element={
            <ProtectedRoute user={user}>
              <Bill user={user} />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
