/* import React from 'react' */
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Exchanges from "./components/Exchanges";
import Coins from "./components/Coins";
/* import Footer from "./components/Footer"; */
import Header from "./components/Header";
import CoinDetails from "./components/CoinDetails";
const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coins" element={<Coins />} />
          <Route path="/coin/:id" element={<CoinDetails/>} />
          <Route path="/exchanges" element={<Exchanges />} />
        </Routes>
      {/*   <Footer /> */}
      </Router>
    </>
  );
};

export default App;
export const server = 'https://api.coingecko.com/api/v3';