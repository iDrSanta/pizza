import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Header } from './components/Header';
import { Home } from './pages/Home';

function App() {
  return (
    <div className="wrapper">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
