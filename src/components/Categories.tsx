import React from 'react';

interface ICategory {
  title: string;
  id: number;
}

const arrCategory: ICategory[] = [
  { title: 'Все', id: 0 },
  { title: 'Мясные', id: 1 },
  { title: 'Вегетарианская', id: 2 },
  { title: 'Гриль', id: 3 },
  { title: 'Острые', id: 4 },
  { title: 'Закрытые', id: 5 },
];

export const Categories = () => {
  const [activeIndex, setActiveIndex] = React.useState<number>(0);

  const onClickCategory = (index: number) => {
    setActiveIndex(index);
  };

  return (
    <div className="categories">
      <ul>
        {arrCategory.map((obj) => (
          <li
            key={obj.id}
            onClick={() => onClickCategory(obj.id)}
            className={activeIndex === obj.id ? 'active' : ''}>
            {obj.title}
          </li>
        ))}
      </ul>
    </div>
  );
};
