import { BrowserRouter, Routes, Route } from "react-router-dom";
import { GlobalStyle } from "./styles/global";
import RestaurantesPage from "./pages/restaurantes-page";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Routes>
        <Route path="/" element={<RestaurantesPage />} />
        <Route path="/restaurantes" element={<RestaurantesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
