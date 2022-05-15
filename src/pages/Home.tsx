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

interface ISortType {
  name: string;
  sortProperty: string;
}
export const Home = () => {
  const [pizzas, setPizzas] = React.useState<IPizza[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [categoryId, setCategoryId] = React.useState<number>(0);
  const [sortType, setSortType] = React.useState<any>({
    name: 'популярности',
    sortProperty: 'rating',
  });

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.sortProperty.replace('-', '');
    const category = categoryId ? `category=${categoryId}` : '';

    async function fetchPizzas() {
      try {
        const { data } = await axios.get<IPizza[]>(
          `https://612272dad446280017054873.mockapi.io/pizza?${category}&sortBy=${sortBy}&order=${order}`,
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
    window.scrollTo(0, 0);
  }, [categoryId, sortType]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id: number) => setCategoryId(id)} />
          <Sort value={sortType} onChangeSort={(property: any) => setSortType(property)} />
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
