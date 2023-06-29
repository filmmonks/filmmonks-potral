import Login from "./components/Dashboard/layout/Login";
import Menubar from "./components/Dashboard/layout/Menubar";
function App() {
  const user = true;
  return <>{user ? <Menubar /> : <Login />}</>;
}

export default App;
