import { Route, Routes } from "react-router-dom";
import Cart from "./ViewPage/Cart";
import DetailCategory from "./ViewPage/DetailCategory";
import Main from "./ViewPage/Main";
import ProductDetail from "./ViewPage/ProductDetail";

const NavigatePage = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route
        path="/fashion"
        element={<DetailCategory name={"패션"} category={"clothing"} />}
      />
      <Route
        path="/accessory"
        element={<DetailCategory name={"액세서리"} category={"jewelery"} />}
      />
      <Route
        path="/digital"
        element={<DetailCategory name={"디지털"} category={"electronics"} />}
      />
      <Route
        path="/grocery"
        element={<DetailCategory name={"식료품"} category={"food"} />}
      />
      <Route path="/product/:id" element={<ProductDetail />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
};

export default NavigatePage;
