import axios, { AxiosError } from 'axios';
import React from 'react';
import { Categories } from '../components/Categories';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort';
import '../scss/app.scss';

interface IPizza {
  id: number;
  imageUrl: string;
  title: string;
  types: number[];
  sizes: number[];
  price: number;
  category: number;
  rating: number;
}

export const Home = () => {
  const [pizzas, setPizzas] = React.useState<IPizza[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchPizzas() {
      try {
        const { data } = await axios.get<IPizza[]>(
          `https://612272dad446280017054873.mockapi.io/pizza`,
        );
        setPizzas(data);
        setIsLoading(false);
      } catch (error) {
        const respError = error as Error | AxiosError;
        if (axios.isAxiosError(respError)) {
          console.warn(`Произошла серверная ошибка ${respError}`);
        } else {
          console.warn(`Произошла программная ошибка`);
        }
      }
    }
    fetchPizzas();
  }, []);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories />
          <Sort />
        </div>
        <h2 className="content__title">Все пиццы</h2>
        <div className="content__items">
          {isLoading
            ? [...new Array(6)].map((_, i) => <Skeleton key={i} />)
            : pizzas.map((obj) => (
                <PizzaBlock
                  key={obj.id}
                  id={obj.id}
                  imageUrl={obj.imageUrl}
                  title={obj.title}
                  types={obj.types}
                  sizes={obj.sizes}
                  price={obj.price}
                  category={obj.category}
                  rating={obj.rating}
                />
              ))}
        </div>
      </div>
    </div>
  );
};
