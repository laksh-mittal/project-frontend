import "./App.css";
import Header from "./containers/header/Header";
import { Routes, Route } from "react-router-dom";
import ProductListing from "./containers/product/ProductListing";
import ProductDetails from "./containers/product/ProductDetail";
import LoginPage from "./containers/login/LoginPage";
import Preference from "./containers/helper/Preference";

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductListing />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <Route path="/preference" element={<Preference />} />
        <Route>404 Not Found</Route>
      </Routes>
    </div>
  );
}

export default App;
