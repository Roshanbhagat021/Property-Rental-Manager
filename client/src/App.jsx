import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import HomePage from "./pages/HomePage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  const location = useLocation();
  const showAll = location.pathname == "/";

  return (
    <>
      <Header />
      <Outlet/>
      {showAll && <HomePage />}
      <Footer />
    </>
  );
}

export default App;
