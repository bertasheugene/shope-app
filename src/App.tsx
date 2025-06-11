import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";
import { Cart } from "./pages/Cart";
import { Product } from "./pages/Product";
import MainLayout from "./components/MainLayout";

import "./scss/app.scss";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/sort/:sortType" element={<Home />} />
          <Route path="/category/:categoryId" element={<Home />} />
          <Route
            path="/sort/:sortType/category/:categoryId"
            element={<Home />}
          />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
          <Route path="product/:id" element={<Product />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
