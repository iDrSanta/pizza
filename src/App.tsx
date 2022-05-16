import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import React from 'react';

function App() {
  const [searchValue, setSearchValue] = React.useState<string>('');

  const onClickClear = () => {
    setSearchValue('');
  };

  return (
    <div className="wrapper">
      <Header
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        onClickClear={onClickClear}
      />
      <Routes>
        <Route path="/" element={<Home searchValue={searchValue} />} />
        <Route path="cart" element={<Cart />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
