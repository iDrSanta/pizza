import { Route, Routes } from 'react-router-dom';
import { Cart } from './pages/Cart';
import { Header } from './components/Header';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import React from 'react';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  const onSetSearchValue = (e) => {
    setSearchValue(e.target.value);
  };

  const onClearSearch = () => {
    setSearchValue('');
  };

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, onSetSearchValue, onClearSearch }}>
        <Header />
        <Routes>
          <Route path="/" element={<Home searchValue={searchValue} />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </SearchContext.Provider>
    </div>
  );
}

export default App;
