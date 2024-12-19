import { useEffect, useState } from "react";
import { auth } from "./firebase-config.tsx";
import { Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import "./App.css";

import NotFound from "./shared/pages/404/404.tsx";
import Home from "./features/bills/pages/home/Home.tsx";
import Login from "./features/auth/pages/login/Login.tsx";
import Bill from "./features/bills/pages/bill/Bill.tsx";
import Register from "./features/auth/pages/register/Register.tsx";
import ProtectedRoute from "./features/auth/components/protectedRoute/ProtectedRoute.tsx";


function App() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
      setLoading(false);
    });

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
        <Route
          path="/"
          element={user ? <Navigate to="/home" /> : <Login />}
        />
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
