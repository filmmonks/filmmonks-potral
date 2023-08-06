import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Dashboard/layout/Login";
import Menubar from "./components/Dashboard/layout/Menubar";
import auth from "./firebase.init";
import "react-toastify/dist/ReactToastify.css";
import { Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Register from "./components/Dashboard/layout/Register";
import { useEffect, useState } from "react";
import Loader from "./components/Dashboard/layout/Loader";
function App() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    {
      user ? <Menubar /> : <Login />;
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);
  if (loading) {
    // Render a loading screen while waiting for the authentication check
    return <Loader />;
  }
  return (
    <>
      {user ? <Menubar /> : <Login />}
      <Routes>
        {/* <Route path="/log-in" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;
