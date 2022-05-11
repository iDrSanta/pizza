import axios from 'axios';
import React from 'react';
import { Categories } from './components/Categories';
import { Header } from './components/Header';
import { PizzaBlock } from './components/PizzaBlock';
import { Sort } from './components/Sort';
import './scss/app.scss';

interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  size: number[];
  price: number;
  category: number;
  rating: number;
}

function App() {
  const [pizzas, setPizzas] = React.useState<IPizza[]>([]);

  React.useEffect(() => {
    axios
      .get(
        `https://s3.us-west-2.amazonaws.com/secure.notion-static.com/36ad4e93-800e-451b-9831-ae6abe1b28ef/pizzas.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20220511%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20220511T112137Z&X-Amz-Expires=86400&X-Amz-Signature=e6dcbbe1209c29c56c03a077a1f668b79b352c939c7ad344ae9436f4b6bbd55b&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22pizzas.json%22&x-id=GetObject`,
      )
      .then(({ data }) => setPizzas(data));
  }, []);

  return (
    <div>
      {' '}
      <div className="wrapper">
        <Header />
        <div className="content">
          <div className="container">
            <div className="content__top">
              <Categories />
              <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
              {pizzas.map((obj) => (
                <PizzaBlock
                  key={obj.id}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  title={obj.title}
                  types={obj.types}
                  size={obj.size}
                  price={obj.price}
                  category={obj.category}
                  rating={obj.rating}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
