import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Dashboard/layout/Login";
import Menubar from "./components/Dashboard/layout/Menubar";
import auth from "./firebase.init";
import "react-toastify/dist/ReactToastify.css";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Register from "./components/Dashboard/layout/Register";
import { useEffect, useState } from "react";
import Loader from "./components/Dashboard/layout/Loader";
import ResetPassword from "./components/Dashboard/layout/ResetPassword";
function App() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    return <Loader />;
  }
  console.log(user);
  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/dashboard" element={<Menubar />} />
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
