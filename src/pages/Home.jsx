import React from 'react';
import axios, { AxiosError } from 'axios';
import { useSelector, useDispatch } from 'react-redux';

import { setCategoryId } from '../redux/slices/filterSlice';
import { Categories } from '../components/Categories';
import { Pagination } from '../components/Pagination';
import { PizzaBlock } from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import { Sort } from '../components/Sort';
import '../scss/app.scss';

export const Home = ({ searchValue }) => {
  const { categoryId, sort } = useSelector(({ filter }) => filter);
  const sortType = sort.sortProperty;
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  React.useEffect(() => {
    setIsLoading(true);

    const order = sortType.includes('-') ? 'asc' : 'desc';
    const sortBy = sortType.replace('-', '');
    const category = categoryId ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';

    async function fetchPizzas() {
      try {
        const { data } = await axios.get(
          `https://612272dad446280017054873.mockapi.io/pizza?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
        );
        setPizzas(data);
        setIsLoading(false);
      } catch (error) {
        const respError = error;
        if (axios.isAxiosError(respError)) {
          console.warn(`Произошла серверная ошибка ${respError}`);
        } else {
          console.warn(`Произошла программная ошибка`);
        }
      }
    }
    fetchPizzas();
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  return (
    <div className="content">
      <div className="container">
        <div className="content__top">
          <Categories value={categoryId} onChangeCategory={(id) => onChangeCategory(id)} />
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
        <Pagination currentPage={currentPage} onChangePage={(number) => setCurrentPage(number)} />
      </div>
    </div>
  );
};
