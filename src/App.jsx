import { BrowserRouter, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Pricing from "./pages/Pricing";
import Product from "./pages/Product";
import PageNotFound from "./pages/PageNotFound";
import PageNav from "./components/PageNav";
import AppLayout from "./pages/AppLayout";
function App() {
  return (
    <BrowserRouter>
      <PageNav />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/price" element={<Pricing />} />
        <Route path="/product" element={<Product />} />
        <Route path="/app" element={<AppLayout />} />
        <Route path="*" element={<PageNotFound />} />
        <Route />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
