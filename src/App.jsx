import "./styles/App.css"
import { Outlet } from "react-router-dom";
import NavBar from "./components/Partials/Navbar";

const App = () => {
  return (
    <>
      <NavBar></NavBar>
      <Outlet context={[]}/>
    </>
  );
};

export default App;