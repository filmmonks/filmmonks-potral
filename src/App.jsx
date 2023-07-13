import { useAuthState } from "react-firebase-hooks/auth";
import Login from "./components/Dashboard/layout/Login";
import Menubar from "./components/Dashboard/layout/Menubar";
import auth from "./firebase.init";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
function App() {
  const [user] = useAuthState(auth);

  return (
    <>
      {/* <Menubar /> */}
      {user ? <Menubar /> : <Login />}
      <ToastContainer />
    </>
  );
}

export default App;
